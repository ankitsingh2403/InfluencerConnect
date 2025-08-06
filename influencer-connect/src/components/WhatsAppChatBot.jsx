export default function WhatsAppChatBot() {
  return (
    <div className="fixed bottom-4 right-4">
      <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
        <img
          src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
          alt="WhatsApp Chat"
          className="w-12 h-12 hover:scale-110 transition-transform"
        />
      </a>
    </div>
  );
}