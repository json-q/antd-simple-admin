import { AesEncryption } from "./cipher";

interface StorageCls {
  /**
   * 设置存储 localStorage 内容
   * @param key 存储 key
   * @param value 存储值
   */
  set: <T>(key: string, value: T) => void;
  /**
   * 获取存储 localStorage 某项
   * @param key
   */
  get: <T>(key: string) => T | null;
  remove: (key: string) => void;
  clear: () => void;
}

const prefixKey = "simp_";
const key = "_11111000001111@";
const iv = "@11111000001111_";

const encryption = new AesEncryption({ key, iv });

class LocalCacha implements StorageCls {
  private prefixKey?: string;
  private encryption: AesEncryption;

  constructor() {
    this.prefixKey = prefixKey;
    this.encryption = encryption;
  }

  private getKey(key: string) {
    return `${this.prefixKey}${key}`.toUpperCase();
  }

  set<T = any>(key: string, value: T) {
    const stringData = JSON.stringify(value);
    const stringfiyValue = this.encryption.encryptByAES(stringData);
    localStorage.setItem(this.getKey(key), stringfiyValue);
  }

  get<T = any>(key: string): T | null {
    const val = localStorage.getItem(this.getKey(key));
    if (!val) return null;
    try {
      const decVal = this.encryption.decryptByAES(val);
      const data = JSON.parse(decVal);
      return data;
    } catch {
      return null;
    }
  }

  remove(key: string) {
    localStorage.removeItem(this.getKey(key));
  }

  clear() {
    localStorage.clear();
  }
}

const localCacha = new LocalCacha();

export default localCacha;
