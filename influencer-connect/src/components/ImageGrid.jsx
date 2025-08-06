
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
export default function ImageGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <img src={img2} className="rounded-xl" alt="Marketing" />
      <img src={img3} className="rounded-xl" alt="Influencer" />
      <img src={img4} className="rounded-xl" alt="Megaphone" />
      <img src={img5} className="rounded-xl" alt="Technology" />
    </div>
  );
}
