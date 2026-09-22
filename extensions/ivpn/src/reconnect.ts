import { Toast, showHUD, showToast } from "@raycast/api";

import { IVPN } from "@/api/ivpn";
import { withNoViewErrorHandler } from "@/utils/errorHandler";

export default withNoViewErrorHandler(async () => {
  const status = await IVPN.getStatus();

  if (status.vpnStatusSimplified === "CONNECTING") {
    showHUD("IVPN is already connecting");
    return;
  }

  if (status.vpnStatusSimplified === "CONNECTED") {
    showToast({ title: "IVPN Reconnecting...", style: Toast.Style.Animated });
    await IVPN.disconnect();
  } else {
    showToast({ title: "IVPN Connecting...", style: Toast.Style.Animated });
  }

  await IVPN.connect({ strategy: "LAST" });
  showToast({ title: "IVPN Reconnected" });
});
