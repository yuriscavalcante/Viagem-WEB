import { LoadingController } from "@ionic/angular";

export const loading = async () => {
    const loadingCtrl: LoadingController = new LoadingController();
    return await loadingCtrl.create();
}