export const saveData = (key, value)=>{
    localStorage.setItem(key, JSON.stringify(value))
}
export function getData(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
export function resetData(){
localStorage.clear();   
}