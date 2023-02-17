import { Link } from 'react-router-dom';

export default function PantryLink() {
  return (
    <Link
      to="/pantry"
      className="absolute left-0 px-4 py-2 opacity-0 hover:opacity-100"
    >
      pantry
    </Link>
  );
}
