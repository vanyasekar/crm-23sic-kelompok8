import React from 'react';
import '../assets/style.css'; 

const ProductColor = () => {
    return (
        <div className="product-container">

            <main>
                <div id='galery'>
                    <img src='https://aqualisfabricare.com/assets/prdsvc/bn_svc.png'/>
                </div>
                <section id="product-detail">
                    <h2>Color Care</h2>
                    <p>
                        Warna dasar dari setiap bahan adalah putih. Kemudian, pewarna tekstil mengubahnya menjadi berbagai warna. Sayangnya, setiap melalui proses pencucian, 
                        beberapa elemen-elemen warna akan hilang meskipun sudah menggunakan pewarna tekstil dengan kualitas terbaik. Seiring dengan berjalannya waktu, pudarnya warna pakaian akan semakin terlihat jelas.
                    </p>
                    <h3>Keunggulan Color Care:</h3>
                    <ul class="ul1"><li class="li3">- Mempertahankan kecerahan warna kain</li>
                    <li class="li3">- Menjaga warna asli kain dari kelunturaN</li>
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

export default ProductColor;
