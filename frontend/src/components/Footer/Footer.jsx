import { assets, FOOTER_CONSTANTS } from "../../assets/assets";

const Footer = () => (
  <footer className="border-t border-slate-100 bg-white px-6 py-8">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <img src={assets.logo} alt="remove.bg" width={30} height={30} />
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} BgErase. All rights reserved.
        </p>
      </div>
      <div className="flex gap-4">
        {FOOTER_CONSTANTS.map((item) => (
          <a
            href={item.url}
            key={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={new URL(item.url).hostname}
            className="rounded opacity-65 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-violet-600"
          >
            <img src={item.logo} alt="" width={24} height={24} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);
export default Footer;
