function MobileNavigationToggle({ handleClick }: { handleClick: () => void }) {
  return (
    <button
      onClick={handleClick}
      type="button"
      className="fill z-20 h-10 w-10 p-1 text-neutral-600 md:hidden"
    >
      <svg className="fill-current" viewBox="0 0 24 24">
        <path d="M3 18h18v-2H3v2Zm0-5h18v-2H3v2Zm0-7v2h18V6H3Z" />
      </svg>
    </button>
  );
}

export default MobileNavigationToggle;
