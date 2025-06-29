import React from 'react';
import '../assets/style.css'; 

const ProductStainRemoval = () => {
    return (
        <div className="product-container">

            <main>
                <div id='galery'>
                    <img src='https://aqualisfabricare.com/assets/prdsvc/COVER6.jpg'/>
                </div>
                <section id="product-detail">
                    <h2>BioStainRemoval</h2>
                    <p>Setiap orang memiliki kehidupan dan aktivitas yang berbeda-beda. Walaupun kita sudah sebisa mungkin menjauhi noda, 
                        namun noda tidak bisa dihindari; noda makanan, noda tinta, noda lemak dan minyak, dan lain-lain. Biasanya, orang-orang menggunakan cairan 
                        kimia dengan pH yang sangat tinggi atau sangat rendah, namun proses ini sering merusak struktur kain.

                    </p>
                    <p >
                        <span style={{color:"#00b0ad"}}>aQualis Fabricare menawarkan BioStainRemoval™</span>, inovasi terbaru untuk menghilangkan 
                        noda dan tetap menjaga warna serta serat dan struktur kain. Dengan pH netral 7, BioStainRemoval™ menggunakan enzim untuk menguraikan protein pada noda dan menghilangkannya dengan sempurna; 
                        termasuk pada sutra, wol, dan kasmir 
                    (<em>cashmere</em>).</p>
                    <h3>Keunggulan BioStainRemoval:</h3>
                    <ul>
                        <li>- Efektif untuk menghilangkan noda berbasis protein</li>
                        <li>- Menggunakan tindakan mekanis yang sangat minim, sehingga mempertahankan struktur asli kain</li>
                        <li>- pH netral 7</li>
                        <li>- Cocok untuk semua jenis kain; termasuk sutra, wol, dan kasmir</li>
                        <li>- Aman untuk kesehatan manusia dan ramah lingkungan</li>
                    </ul>
                </section>

                
            </main>

            <footer>
                <p>&copy; 2025 aQualis Fabricare. Semua hak dilindungi.</p>
            </footer>
        </div>
    );
};

export default ProductStainRemoval;
