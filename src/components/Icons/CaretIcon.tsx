import { classNames } from '../../util';

function CaretIcon({ isRotated }: { isRotated: boolean }) {
  return (
    <svg
      className={classNames('fill-current', isRotated ? 'transform rotate-180' : '')}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M4 10V8h16v2h-2v2h-3v2h-2v2h-2v-2H9v-2H6v-2H4Z" />
    </svg>
  );
}

export default CaretIcon;
