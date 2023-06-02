export default function Popup({ children }) {
  return (
    <div
      className="fixed-top"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}>
      <div
        className="row"
        style={{
          backgroundColor: "#FFFFFF",
        }}>
        <div className="p-30">{children}</div>
      </div>
    </div>
  );
}