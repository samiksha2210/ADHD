from flask import Flask, request, jsonify
from flask_cors import CORS
from eeg_utils import load_eeg_data, compute_fft_and_bands, get_outliers, get_stats

app = Flask(__name__)
CORS(app)

eeg_data = load_eeg_data()

@app.route('/subjects')
def subjects():
    adhd = [k for k in eeg_data if k.startswith("ADHD")]
    control = [k for k in eeg_data if k.startswith("Control")]
    return jsonify({'ADHD': adhd, 'Control': control})

@app.route('/channel-data', methods=['POST'])
def channel_data():
    data = request.json
    subject = data['subject']
    ch_index = data['channel_index']
    signal = eeg_data[subject][0][:, ch_index]
    return jsonify({'signal': signal.tolist()})

@app.route('/frequency-data', methods=['POST'])
def freq_data():
    data = request.json
    subject = data['subject']
    ch_index = data['channel_index']
    signal = eeg_data[subject][0][:, ch_index]
    freqs, power, bands = compute_fft_and_bands(signal)
    return jsonify({'freqs': freqs.tolist(), 'power': power.tolist(), 'bands': bands})

@app.route('/outliers', methods=['POST'])
def get_outlier_data():
    data = request.json
    subject = data['subject']
    ch_index = data['channel_index']
    threshold = float(data.get('threshold', 3.0))
    signal = eeg_data[subject][0][:, ch_index]
    outlier_indices = get_outliers(signal, threshold)
    return jsonify({'outliers': outlier_indices.tolist()})

@app.route('/stats', methods=['POST'])
def signal_stats():
    data = request.json
    subject = data['subject']
    ch_index = data['channel_index']
    signal = eeg_data[subject][0][:, ch_index]
    return jsonify(get_stats(signal))

if __name__ == '__main__':
    app.run(debug=True)
