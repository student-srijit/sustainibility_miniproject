declare module 'leaflet' {
  export function map(element: HTMLElement): {
    setView(coords: [number, number], zoom: number): any;
    remove(): void;
  };
  export function tileLayer(url: string, options: any): {
    addTo(map: any): any;
  };
  export function marker(coords: [number, number], options?: any): {
    addTo(map: any): any;
  };
  export function divIcon(options: any): any;
  export function circle(coords: [number, number], options: any): {
    addTo(map: any): any;
  };
}
