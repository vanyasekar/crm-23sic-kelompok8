import React from 'react';
import '../assets/style.css'; 

const ProductColor = () => {
    return (
        <div className="product-container">

            <main>
                <div id='galery'>
                    <img src='https://aqualisfabricare.com/assets/prdsvc/prd01.png'/>
                </div>
                <section id="product-detail">
                    <h2>Antibacterial Guard</h2>
                    <p>
                        Hampir semua orang meyakini bahwa bakteri, virus, dan jamur yang menempel di pakaian akan mati saat pakaian dicuci. Namun, ahli kesehatan menemukan bahwa banyak bakteri, virus, dan jamur yang tidak mati, bahkan berkembang biak saat proses pencucian, di mana nantinya bakteri-bakteri ini dapat menimbulkan penyakit bagi manusia.
                    </p>
                    <p>
                        Formula Antibacterial Guard kami 2x lebih kuat dari sebelumnya. Kami sadar dan selalu berpegang teguh pada filosofi kami bahwa "Higienitas bukanlah tren, melainkan gaya hidup". Kami meningkatkan dosis dan memperkuat formulasi untuk memastikan Anda mendapatkan perlindungan total. Berkat efektivitas 99,9% dan perlindungan tahan lama yang akan bertahan hingga pencucian berikutnya (hingga 30 hari).
                    </p>
                    <h3>Keunggulan Antibacterial Guard:</h3>
                    <ul>
                        <li>99.9% efektif dalam membunuh lebih dari 20 macam bakteri, virus, dan jamur</li>
                        <li>Perlindungan terhadap multiplikasi bakteri, virus, dan jamur</li>
                        <li>Perlindungan jangka panjang hingga pencucian berikutnya (Hingga 30 hari)</li>
                        <li>Aman untuk kesehatan manusia dan ramah lingkungan</li>
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
