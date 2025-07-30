import React, { useEffect, useState } from 'react';
import { fetchSubjects, fetchChannelData, fetchStats, fetchFFTData } from './services/api';
import EEGChart from './components/EEGChart';
import FFTChart from './components/FFTChart';
import StatsPanel from './components/StatsPanel';
import './App.css';

const channels = ["Fp1","Fp2","F3","F4","C3","C4","P3","P4","O1","O2","F7","F8","T7","T8","P7","P8","Fz","Cz","Pz"];

function App() {
  const [subjects, setSubjects] = useState({ ADHD: [], Control: [] });
  const [subject1, setSubject1] = useState('');
  const [subject2, setSubject2] = useState('');
  const [channel, setChannel] = useState(0);
  const [signal1, setSignal1] = useState([]);
  const [signal2, setSignal2] = useState([]);
  const [fft1, setFFT1] = useState(null);
  const [fft2, setFFT2] = useState(null);
  const [stats1, setStats1] = useState({});
  const [stats2, setStats2] = useState({});

  useEffect(() => {
    fetchSubjects().then(setSubjects);
  }, []);

  useEffect(() => {
    if (subject1) {
      fetchChannelData(subject1, channel).then(res => setSignal1(res.signal));
      fetchFFTData(subject1, channel).then(setFFT1);
      fetchStats(subject1, channel).then(setStats1);
    }
    if (subject2) {
      fetchChannelData(subject2, channel).then(res => setSignal2(res.signal));
      fetchFFTData(subject2, channel).then(setFFT2);
      fetchStats(subject2, channel).then(setStats2);
    }
  }, [subject1, subject2, channel]);

  return (
    <div className="app-container">
      <h2>🧠 EEG Comparison Viewer</h2>

      <div className="controls">
        <select onChange={e => setSubject1(e.target.value)} value={subject1}>
          <option value="">Select ADHD Subject</option>
          {subjects.ADHD.map(s => <option key={s}>{s}</option>)}
        </select>

        <select onChange={e => setSubject2(e.target.value)} value={subject2}>
          <option value="">Select Control Subject</option>
          {subjects.Control.map(s => <option key={s}>{s}</option>)}
        </select>

        <select onChange={e => setChannel(Number(e.target.value))} value={channel}>
          {channels.map((ch, idx) => <option key={ch} value={idx}>{ch}</option>)}
        </select>
      </div>

      <div className="charts-container">
        <div className="subject-panel">
          <h4>🧒 ADHD Subject</h4>
          <EEGChart signal={signal1} />
          <FFTChart data={fft1} />
          <StatsPanel stats={stats1} />
        </div>
        <div className="subject-panel">
          <h4>🧑 Control Subject</h4>
          <EEGChart signal={signal2} />
          <FFTChart data={fft2} />
          <StatsPanel stats={stats2} />
        </div>
      </div>
    </div>
  );
}

export default App; 