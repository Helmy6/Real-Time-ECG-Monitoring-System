
# 🫀 Real-Time ECG Monitoring System

A React-based real-time dashboard to visualize ECG signals streamed from a Raspberry Pi, powered by AI for cardiac condition classification.

---

### 📌 Features

- 📈 **Real-Time ECG Visualization** via WebSocket
- 🧠 **AI Diagnosis** of heart condition (Normal / Abnormal)
- ❤️ **Heart Rate Monitoring**
- 📊 **Confidence Score** of AI predictions
- 💻 Responsive UI using **Material UI**
- 🚀 Deployed with **Vercel**

---

### 📺 Demo Screenshot

![ECG Dashboard](https://raw.githubusercontent.com/Helmy6/Real-Time-ECG-Monitoring-System/main/images/ecg_dashboard_demo.png)

---

### ⚙️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React (Vite) |
| UI       | Material UI |
| Charts   | Recharts |
| Data Source | Raspberry Pi |
| Communication | WebSocket |
| Deployment | Vercel |

---

### 📂 Project Structure (Main Frontend Components)

- `Dashboard.jsx`: Main layout and logic flow
- `ECGChart.jsx`: Core ECG graphing logic (WebSocket + Recharts)
- `StatCards.jsx`: Displays AI result, confidence, and heart rate
- `AlertBox.jsx`: Conditional alert styling based on heart status
- `Sidebar.jsx`, `Header.jsx`: Responsive navigation

---

### 🧪 How to Run Locally

```bash
git clone https://github.com/Helmy6/Real-Time-ECG-Monitoring-System.git
cd Real-Time-ECG-Monitoring-System
npm install
npm run dev
```

Ensure WebSocket server (Raspberry Pi or backend) is running at `ws://<your-ip>:8100`.

---

### 📫 Contact

Feel free to reach out:

- 📧 Email: nelnahas54@gmail.com
- 🌐 LinkedIn: https://linkedin.com/in/helmy-elnahas54

---

### 📜 License

This project is licensed under the MIT License.
