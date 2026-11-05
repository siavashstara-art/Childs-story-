export function usePWAInstall() {
  return {
    isInstallable: false,
    isInstalled: true,
    isIOS: false,
    install: async () => false
  };
}
