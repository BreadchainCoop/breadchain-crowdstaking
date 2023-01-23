import ExternalNavLink from '../ExternalNavLink';

export default function FooterNav() {
  return (
    <nav className="flex items-center justify-between px-2 py-4 text-xs text-neutral-500 md:px-4">
      <ExternalNavLink href="/github.com">Github</ExternalNavLink>

      <span className="px-2">|</span>
      <ExternalNavLink href="/discord.com">Discord</ExternalNavLink>

      <span className="px-2">|</span>
      <ExternalNavLink href="/guild.com">Guild</ExternalNavLink>
    </nav>
  );
}
