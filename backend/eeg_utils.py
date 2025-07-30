import os
import scipy.io
import numpy as np
from scipy.stats import zscore
from scipy.signal import find_peaks

fs = 128  # Hz
channel_labels = ["Fp1", "Fp2", "F3", "F4", "C3", "C4", "P3", "P4", "O1", "O2", "F7", "F8", "T7", "T8", "P7", "P8", "Fz", "Cz", "Pz"]

def load_eeg_data():
    folders = {
        "data/ADHD_part1/ADHD_part1": "ADHD",
        "data/ADHD_part2/ADHD_part2": "ADHD",
        "data/Control_part1/Control_part1": "Control",
        "data/Control_part2/Control_part2": "Control"
    }
    data = {}
    for folder, label in folders.items():
        if not os.path.exists(folder): continue
        for file in os.listdir(folder):
            if file.endswith(".mat"):
                mat = scipy.io.loadmat(os.path.join(folder, file))
                var = [k for k in mat.keys() if not k.startswith("__")][0]
                key = f"{label} - {file}"
                data[key] = (mat[var], label)
    return data

def compute_fft_and_bands(signal):
    signal = signal - np.mean(signal)
    freqs = np.fft.fftfreq(len(signal), 1 / fs)
    fft_vals = np.abs(np.fft.fft(signal))[:len(freqs) // 2]
    freqs = freqs[:len(freqs) // 2]
    fft_vals /= np.max(fft_vals)

    def band_power(f, p, low, high):
        return float(np.mean(p[(f >= low) & (f < high)]))

    return freqs, fft_vals, {
        "Theta (4–8 Hz)": band_power(freqs, fft_vals, 4, 8),
        "Alpha (8–13 Hz)": band_power(freqs, fft_vals, 8, 13),
        "Beta (13–30 Hz)": band_power(freqs, fft_vals, 13, 30)
    }

def get_outliers(signal, threshold):
    z = zscore(signal)
    outliers = np.where(np.abs(z) > threshold)[0]
    peaks, _ = find_peaks(np.abs(signal), height=300, distance=100)
    return np.intersect1d(outliers, peaks)

def get_stats(signal):
    return {
        "Mean": float(np.mean(signal)),
        "Std": float(np.std(signal)),
        "Max": float(np.max(signal)),
        "Min": float(np.min(signal))
    }
