// 1. Aylar dizisini takvim motorundan ithal ediyoruz (Yoksa aylar[ayIndexi] çöker)
import { aylar } from './create-calendar.js';

export function modalIceriginiCiz(tarih, gunSayisi) {
    // 2. Eksik olan HTML elementlerini bu odanın içinde tanımlıyoruz
    const modalBaslik = document.getElementById('modal-baslik');
    const modalIcerik = document.querySelector('.modal-icerik');

    const parcalar = tarih.split('-'); 
    const yil = parcalar[0];
    const ayIndexi = parseInt(parcalar[1], 10) - 1;
    const ayIsmi = aylar[ayIndexi]; 

    if (modalBaslik) modalBaslik.innerText = `${gunSayisi} ${ayIsmi} ${yil}`;

    let tumKayitlar = JSON.parse(localStorage.getItem('yemekKayitlari')) || {};
    const oGununVerisi = tumKayitlar[tarih]; 

    if (oGununVerisi && oGununVerisi.length > 0) {
      let tumIcerikHTML = ""; 
      
      oGununVerisi.forEach((kayit, index) => {
        let toplamTutar = 0; 
        let yemekListesiHTML = `<ul style="font-size: 16px; line-height: 1.6; margin-bottom: 0; padding-left: 0; list-style-type: none;">`;
        
        kayit.yemekler.forEach(yemek => {
          if (typeof yemek === 'string') {
            yemekListesiHTML += `<li>- ${yemek}</li>`;
          } else {
            if (yemek.fiyat) toplamTutar += parseInt(yemek.fiyat, 10);
            
            yemekListesiHTML += `
              <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.05); margin-bottom: 5px; padding-bottom: 5px;">
                <span>${yemek.isim}</span>
                <span style="color: #4CAF50; font-weight: bold;">${yemek.fiyat}₺</span>
              </li>`;
          }
        });
        
        yemekListesiHTML += `</ul>`;

        let toplamTutarHTML = "";
        if (toplamTutar > 0) {
          toplamTutarHTML = `
            <hr style="border: none; border-bottom: 1px dashed rgba(255, 255, 255, 0.2); margin: 10px 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
              <span style="font-weight: bold; opacity: 0.9;">Toplam:</span>
              <span style="color: #ffcc00; font-size: 20px; font-weight: bold;">${toplamTutar}₺</span>
            </div>
          `;
        }

        tumIcerikHTML += `
          <div style="position: relative; background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #ffcc00;">
            
            <button class="kayit-sil-btn" data-tarih="${tarih}" data-index="${index}" data-gun="${gunSayisi}" 
              style="position: absolute; top: 10px; right: 10px; background: #ff4444; border: none; color: white; width: 30px; height: 30px; border-radius: 5px; cursor: pointer; font-weight: bold; transition: 0.2s;">
              X
            </button>

            <p style="color: #ffcc00; font-size: 18px; font-weight: bold; margin: 0 0 10px 0; padding-right: 35px;">Profil: ${kayit.profil}</p>
            <p style="margin: 0; font-weight: bold; opacity: 0.9;">Seçilen Yemekler:</p>
            <hr style="border: none; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin: 8px 0 10px 0;">
            ${yemekListesiHTML}
            ${toplamTutarHTML}
          </div>
        `;
      });
      
      // Koruma eklendi (modalIcerik varsa çiz)
      if(modalIcerik) modalIcerik.innerHTML = tumIcerikHTML;
    } else {
      if(modalIcerik) modalIcerik.innerHTML = `<p style="opacity: 0.7;">Bu güne ait herhangi bir seçim bulunmuyor.</p>`;
    }
}