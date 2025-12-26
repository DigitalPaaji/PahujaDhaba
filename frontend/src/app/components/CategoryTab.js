export default function CategoryTab({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center px-4 py-3 rounded-2xl min-w-[80px] transition-all ${
        active 
          ? 'bg-primary text-white shadow-md' 
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}