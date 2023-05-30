import { ToastController } from "@ionic/angular";

export const presentToast = async (message: string, duration: number = 1500, position: any = 'bottom', cssClass: string) => {
    const toast: ToastController = new ToastController();
    return await toast.create({
        cssClass: cssClass,
        message: message,
        duration: duration,
        position: position,
    });
    
}
