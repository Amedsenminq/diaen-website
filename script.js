// Saat
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
  }, 1000);
  
  // Tema Değiştirici
  const themeBtn = document.querySelector('.theme-toggle');
  themeBtn.onclick = () => {
    const current = document.body.dataset.theme;
    const next = current === 'light' ? 'dark' : 'light';
    document.body.dataset.theme = next;
    localStorage.setItem('theme', next);
  };
  
  // Sayfa açıldığında kayıtlı tema ayarını yükle
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.dataset.theme = savedTheme;
  });
  
  // Giriş Yap (auth.html)
  if (document.getElementById('auth-submit')) {
    document.getElementById('auth-submit').onclick = () => {
      const user = document.getElementById('username').value;
      const pass = document.getElementById('password').value;
      if (user && pass) {
        localStorage.setItem('user', user);
        alert('Giriş başarılı!');
      } else {
        alert('Lütfen tüm alanları doldurun.');
      }
    };
  }
  
  // Cihaz Tara (devices.html)
  if (document.getElementById('device-scan')) {
    document.getElementById('device-scan').onclick = async () => {
      try {
        const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
        document.getElementById('device-status').innerText = device.name || device.id;
      } catch (error) {
        console.warn(error);
        alert('Bluetooth cihazı bulunamadı veya erişim reddedildi.');
      }
    };
  }
  
  // Senkronize Et (sync.html)
  if (document.getElementById('sync-now')) {
    document.getElementById('sync-now').onclick = async () => {
      document.getElementById('sync-status').innerText = 'Senkronizasyon başlıyor...';
      setTimeout(() => {
        document.getElementById('sync-status').innerText = 'Senkronizasyon tamamlandı!';
      }, 2000);
    };
  }
  
  // Acil Durum Modu (emergency.html)
  if (document.getElementById('emergency-mode')) {
    document.getElementById('emergency-mode').onclick = () => {
      alert('Acil durum modu aktif edildi!');
    };
  }
  
  // Tahmin Yap (prediction.html)
  if (document.getElementById('make-prediction')) {
    document.getElementById('make-prediction').onclick = () => {
      document.getElementById('prediction').innerText = 'Yarın sabah: 120 mg/dL';
    };
  }
  
  // PDF Oluştur (reports.html)
  if (document.getElementById('generate-pdf')) {
    document.getElementById('generate-pdf').onclick = () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.text('Diaen Haftalık Rapor', 10, 10);
      doc.save('rapor.pdf');
    };
  }
  
  // Takvime Ekle (calendar.html)
  if (document.getElementById('add-calendar')) {
    document.getElementById('add-calendar').onclick = () => {
      const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Ölçüm Hatırlatma\nDTSTART:${new Date().toISOString().replace(/[-:]/g,'').split('.')[0]}\nEND:VEVENT\nEND:VCALENDAR`;
      const blob = new Blob([ics], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hatirlatici.ics';
      a.click();
    };
  }
  
  // Sesli Komut Başlat (voice.html)
  if (document.getElementById('start-voice')) {
    document.getElementById('start-voice').onclick = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.onresult = (e) => {
          document.getElementById('voice-result').innerText = 'Duyulan: ' + e.results[0][0].transcript;
        };
        recognition.start();
      } else {
        alert('Tarayıcınız ses tanımayı desteklemiyor.');
      }
    };
  }
  
  // Paylaşım (social.html)
  if (document.getElementById('start-share')) {
    document.getElementById('start-share').onclick = () => {
      if (navigator.share) {
        navigator.share({
          title: 'Diaen - Diyabet Asistanı',
          text: 'Diaen uygulamasını keşfet!',
          url: window.location.href
        });
      } else {
        alert('Paylaşım desteği bulunamadı.');
      }
    };
  }
  
  // Tema Renk Seçici (themes.html)
  if (document.getElementById('choose-theme')) {
    document.getElementById('choose-theme').onclick = () => {
      const color = document.getElementById('theme-color').value;
      document.body.style.background = color;
    };
  }
  
  // Dil Seçimi (i18n.html)
  if (document.querySelectorAll('.lang-btn')) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.onclick = (e) => {
        const selectedLang = e.target.getAttribute('data-lang');
        alert('Seçilen dil: ' + selectedLang);
      };
    });
  }
  
  // İçerik Yükleme (content.html)
  if (document.getElementById('load-content')) {
    document.getElementById('load-content').onclick = () => {
      const articles = [
        { title: 'Kan Şekeri Takibi' },
        { title: 'İnsülin ve Tip 1 Diyabet' },
        { title: 'Egzersiz ile Şeker Kontrolü' }
      ];
      const container = document.getElementById('articles');
      container.innerHTML = articles.map(article => `
        <div class="card">
          <h3>${article.title}</h3>
        </div>
      `).join('');
    };
  }
  