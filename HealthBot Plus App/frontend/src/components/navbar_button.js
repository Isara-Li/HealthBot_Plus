function NavbarButton({ label, links }) {
  return (
    <div className="relative inline-block group w-full h-full">
      <button className="bg-slate-100 text-black font-semibold py-2 px-4 w-full h-full  ">
        {label}
      </button>
      <div className="absolute hidden group-hover:block bg-white text-black font-semibold pt-1 w-full ">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="block px-4 py-2 text-sm hover:bg-gray-200 border-b border-gray-200 last:border-b-0"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default NavbarButton;
