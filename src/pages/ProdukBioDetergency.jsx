import React from 'react';
import '../assets/style.css'; 

const ProductBioDetergency = () => {
    return (
        <div className="product-container">

            <main>
                <div id='galery'>
                    <img src='https://aqualisfabricare.com/assets/prdsvc/COVER7.jpg'/>
                </div>
                <section id="product-detail">
                    <h2>Bio Detergency</h2>
                    <p>
                        aQualis Fabricare telah memasuki era pencucian menggunakan enzim melalui 
                        <span style={{color:"#00b0ad"}}> formulasi khusus Bio Detergency</span>
                         kami yang merupakan gabungan dari 2 enzim; protease dan lipase, digabungkan dengan campuran eksklusif dari surfaktan GreenChemical™. 
                         Peran utama surfaktan adalah untuk mengurangi tegangan di permukaan serat-serat pakaian agar noda mudah dihilangkan dari permukaan kain. Secara paralel, 
                         enzim protease dan lipase mempercepat proses dengan menguraikan noda berbasis protein, berbasis lemak, dan juga noda lainnya menjadi partikel-partikel yang 
                         lebih kecil sehingga mereka dapat keluar dengan mudah dan mencegahnya untuk menempel lagi ke permukaan kain.
                    </p>
                    
                    <h3>Keunggulan Bio Detergency:</h3>
                    <ul class="ul1"><li class="li3">Teknologi Eropa, terobosan baru deterjen</li>
                    <li class="li3">- Sangat efektif untuk menghilangkan noda berbasis protein dan lemak</li>
                    <li class="li3">- Kombinasi dari 2 enzim; protease dan lipase untuk menghilangkan noda dengan maksimal</li>
                    <li class="li3">- pH netral 7</li>
                    <li class="li3">- Aman untuk kesehatan manusia dan ramah lingkungan</li>
                    </ul>
                </section>

                
            </main>

            <footer>
                <p>&copy; 2025 aQualis Fabricare. Semua hak dilindungi.</p>
            </footer>
        </div>
    );
};

export default ProductBioDetergency;
