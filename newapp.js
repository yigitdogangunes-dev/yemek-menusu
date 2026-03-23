import { yemekVeritabani } from "./foods-db.js";
import { modalIceriginiCiz } from "./calendar-modal.js";
import { takvimiOlustur, suAnkiTarih } from "./create-calendar.js";
import { rastgeleSec } from "./choose-random.js";

document.addEventListener('DOMContentLoaded', function() {
  
  const tarihGirdisi = document.getElementById('tarih');
  const profilKartlari = document.querySelectorAll('.profile div'); //profile altındaki isimleri tek tek almak için profile div kullandık.
  const onayFooter = document.querySelector('.onayla'); //onayla classını onayFooter değişkenine koyuyo.
  const menuAlani = document.getElementById('dinamik-menu-alani');

  if (tarihGirdisi) {
    
    tarihGirdisi.addEventListener('click', function() {
      if (typeof this.showPicker === 'function') this.showPicker();
    });

    tarihGirdisi.addEventListener('change', function() {
      const secilenGun = this.value;
      if (!secilenGun) return;

      let uretilenMenuler = JSON.parse(localStorage.getItem('uretilenGunlukMenuler')) || {};

      if (!uretilenMenuler[secilenGun]) {
        uretilenMenuler[secilenGun] = {
          corba: rastgeleSec(yemekVeritabani.corba, 2),
          anaYemek: rastgeleSec(yemekVeritabani.anaYemek, 3),
          eslikci: rastgeleSec(yemekVeritabani.eslikci,2),
          soguk: rastgeleSec(yemekVeritabani.soguk, 2),
          tatli: rastgeleSec(yemekVeritabani.tatli, 2)
        };
        localStorage.setItem('uretilenGunlukMenuler', JSON.stringify(uretilenMenuler));
      }

      const gununMenusu = uretilenMenuler[secilenGun];
      
      menuAlani.innerHTML = `
        <div class="kategori-bolumu">
          <h2>ÇORBA</h2>
          <div class="list">
            ${gununMenusu.corba.map((y, index) => `
              <div class="corba" data-fiyat="${y.fiyat}" style="animation-delay: ${index * 0.1}s">
                <img src="${y.image}">
                <p>${y.isim}</p>
                <p class="ucret">${y.fiyat}₺</p>
              </div>`).join('')}
          </div>
        </div>
        
        <div class="kategori-bolumu">
          <h2>ANA YEMEK</h2>
          <div class="list">
            ${gununMenusu.anaYemek.map((y, index) => `
              <div class="yemek" data-fiyat="${y.fiyat}" style="animation-delay: ${index * 0.1}s">
                <img src="${y.image}">
                <p>${y.isim}</p>
                <p class="ucret">${y.fiyat}₺</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="kategori-bolumu">
          <h2>EŞLİKÇİ</h2>
          <div class="list">
            ${gununMenusu.eslikci.map((y, index) => `
              <div class="yemek" data-fiyat="${y.fiyat}" style="animation-delay: ${index * 0.1}s">
                <img src="${y.image}">
                <p>${y.isim}</p>
                <p class="ucret">${y.fiyat}₺</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="kategori-bolumu">
          <h2>SOĞUK</h2>
          <div class="list">
            ${gununMenusu.soguk.map((y, index) => `
              <div class="soguk" data-fiyat="${y.fiyat}" style="animation-delay: ${index * 0.1}s">
                <img src="${y.image}">
                <p>${y.isim}</p>
                <p class="ucret">${y.fiyat}₺</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="kategori-bolumu">
          <h2>TATLI</h2>
          <div class="list">
            ${gununMenusu.tatli.map((y, index) => `
              <div class="tatlı" data-fiyat="${y.fiyat}" style="animation-delay: ${index * 0.1}s">
                <img src="${y.image}">
                <p>${y.isim}</p>
                <p class="ucret">${y.fiyat}₺</p>
              </div>`).join('')}
          </div>
        </div>
      `;
      
      profilKartlari.forEach(k => k.classList.remove('secili'));
      if(onayFooter) onayFooter.classList.remove('active');
    });

    profilKartlari.forEach(kart => {
    kart.addEventListener('click', function() {
    if (tarihGirdisi.value === "") {
      alert("Lütfen profil seçmeden önce bir tarih belirleyin.");
      return; 
    }

    // 1. Tıklanan kartın anlık durumunu kontrol et (Boolean: true/false döner)
    const seciliMi = this.classList.contains('secili');

    // 2. DOM üzerindeki tüm kartlardan 'secili' sınıfını temizle (Reset)
    profilKartlari.forEach(k => k.classList.remove('secili'));

    // 3. Eğer kart tıklanmadan önce seçili DEĞİL idiyse, şimdi seç.
    // Eğer zaten seçiliyse işlem yapma (yukarıdaki reset işlemi zaten sınıfı kaldırdı).
    if (!seciliMi) {
      this.classList.add('secili');
    }
  });
});

    if (menuAlani) {
      menuAlani.addEventListener('click', function(e) {
        const kart = e.target.closest('.list > div');
        
        if (kart) {
          const liste = kart.parentElement;
          if (kart.classList.contains('secili-yemek')) {
            kart.classList.remove('secili-yemek');
          } else {
            liste.querySelectorAll('.secili-yemek').forEach(k => k.classList.remove('secili-yemek'));
            kart.classList.add('secili-yemek');
          }

          if (onayFooter) {
            const seciliKartVarMi = document.querySelectorAll('.secili-yemek').length > 0;
            if (seciliKartVarMi) onayFooter.classList.add('active');
            else onayFooter.classList.remove('active');
          }
        }
      });
    }

    if (onayFooter) {
      onayFooter.addEventListener('click', function() {
        const seciliProfil = document.querySelector('.profile div.secili');
        if (!seciliProfil) {
          alert("Lütfen menüleri kaydetmeden önce yukarıdan bir profil seçin!");
          return;
        }
        const profilAdi = seciliProfil.querySelector('p').innerText;

        const seciliYemekKutulari = document.querySelectorAll('.secili-yemek');
        let secilenYemekler = [];
        
        seciliYemekKutulari.forEach(kutu => {
          const yemekAdi = kutu.querySelector('p:not(.ucret)').innerText;
          const yemekFiyati = kutu.getAttribute('data-fiyat'); 

          secilenYemekler.push({ isim: yemekAdi, fiyat: yemekFiyati });
        });

        const secilenTarih = tarihGirdisi.value; 
        let tumKayitlar = JSON.parse(localStorage.getItem('yemekKayitlari')) || {};
        
        if (!tumKayitlar[secilenTarih]) {
          tumKayitlar[secilenTarih] = [];
        }
   
        // O güne ait kayıtlarda, aynı isimli profil varsa onu filtreden geçirip siliyoruz!
        tumKayitlar[secilenTarih] = tumKayitlar[secilenTarih].filter(kayit => kayit.profil !== profilAdi);
        
        // Şimdi eskisini sildiğimiz veya hiç olmayan o taze kaydı listeye ekliyoruz:
        tumKayitlar[secilenTarih].push({
          profil: profilAdi,
          yemekler: secilenYemekler
        });
        
        localStorage.setItem('yemekKayitlari', JSON.stringify(tumKayitlar));
        alert(`Şahane! Seçimleriniz ${secilenTarih} tarihi için ${profilAdi} profiline kaydedildi.`);
        
        window.scrollTo ({
            top: 0,
            behavior: "smooth"
        });
        
        onayFooter.classList.remove('active');
        seciliYemekKutulari.forEach(k => k.classList.remove('secili-yemek'));
        profilKartlari.forEach(k => k.classList.remove('secili'));
      });
    }
  }

  // =========================================================
  // 2. MOTOR: TAKVİM OLUŞTURMA (HTML'İ ÇİZME)
  // =========================================================
  const gunlerKutusu = document.getElementById('takvim-gunleri');
  const baslik = document.getElementById('ay-yil-baslik');
  const oncekiBtn = document.getElementById('onceki-ay');
  const sonrakiBtn = document.getElementById('sonraki-ay');


  if(oncekiBtn && sonrakiBtn) {
    oncekiBtn.addEventListener('click', () => { suAnkiTarih.setMonth(suAnkiTarih.getMonth() - 1); takvimiOlustur(); });
    sonrakiBtn.addEventListener('click', () => { suAnkiTarih.setMonth(suAnkiTarih.getMonth() + 1); takvimiOlustur(); });
  }

  takvimiOlustur();

  const modal = document.getElementById('gunModali');
  const kapatBtn = document.getElementById('modalKapatBtn');
  const takvimIzgara = document.getElementById('takvim-gunleri');
  const modalIcerik = document.querySelector('.modal-icerik');
  const modalBaslik = document.getElementById('modal-baslik');


  if (takvimIzgara) {
    takvimIzgara.addEventListener('click', function(e) {
      const tiklananGunKutusu = e.target.closest('#takvim-gunleri > div');
      
      if (tiklananGunKutusu && !tiklananGunKutusu.classList.contains('bos-kutu')) {
        const oGununTarihi = tiklananGunKutusu.getAttribute('data-tarih');
        const gunSayisi = tiklananGunKutusu.querySelector('.gun-numarasi').innerText;
        
        modalIceriginiCiz(oGununTarihi, gunSayisi);

        if (modal) modal.classList.add('acik');
      }
    });
  }

  if (modalIcerik) {
    modalIcerik.addEventListener('click', function(e) {
      if (e.target.classList.contains('kayit-sil-btn')) {
        const silinecekTarih = e.target.getAttribute('data-tarih');
        const silinecekIndex = parseInt(e.target.getAttribute('data-index'));
        const oGun = e.target.getAttribute('data-gun');

        let tumKayitlar = JSON.parse(localStorage.getItem('yemekKayitlari')) || {};

        tumKayitlar[silinecekTarih].splice(silinecekIndex, 1);

        if (tumKayitlar[silinecekTarih].length === 0) {
          delete tumKayitlar[silinecekTarih];
        }

        localStorage.setItem('yemekKayitlari', JSON.stringify(tumKayitlar));
        
        modalIceriginiCiz(silinecekTarih, oGun);
        if (typeof takvimiOlustur === 'function') takvimiOlustur();
      }
    });
  }

  if (kapatBtn) kapatBtn.addEventListener('click', () => { if(modal) modal.classList.remove('acik'); });
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('acik'); });

  // 1. Bugünün tarihini formatla
    const bugun = new Date();
    const yil = bugun.getFullYear();
    const ay = String(bugun.getMonth() + 1).padStart(2, '0');
    const gun = String(bugun.getDate()).padStart(2, '0');
    

    const formatlanmisTarih = `${yil}-${ay}-${gun}`;
    if (tarihGirdisi) {
    tarihGirdisi.max = formatlanmisTarih;
    tarihGirdisi.value = formatlanmisTarih;
    tarihGirdisi.dispatchEvent(new Event('change'));
}
});

