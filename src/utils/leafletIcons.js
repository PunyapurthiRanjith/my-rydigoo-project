import L from "leaflet";

const createDivIcon = (color, label, ringColor = "white") =>
  L.divIcon({
    className: "rydigoo-marker",
    html: `
      <div style="
        display:flex;flex-direction:column;align-items:center;
        transform:translate(-50%,-100%);
      ">
        <div style="
          background:${color};color:white;font-weight:700;font-size:11px;
          min-width:28px;height:28px;border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;
          border:3px solid ${ringColor};box-shadow:0 4px 12px rgba(0,0,0,0.25);
        ">
          <span style="transform:rotate(45deg)">${label}</span>
        </div>
      </div>
    `,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });

export const fromMarkerIcon = createDivIcon("#0d9488", "A");
export const toMarkerIcon = createDivIcon("#4f46e5", "B");
export const userMarkerIcon = L.divIcon({
  className: "rydigoo-marker",
  html: `
    <div style="transform:translate(-50%,-50%);position:relative;">
      <div style="
        width:18px;height:18px;background:#2563eb;border:3px solid white;
        border-radius:50%;box-shadow:0 0 0 6px rgba(37,99,235,0.25),0 4px 12px rgba(0,0,0,0.2);
      "></div>
    </div>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -12],
});
