package trucker.group;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.AssetManager;
import android.preference.PreferenceManager;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

final class TestConfigurationProvider {
    void setTestIp(Context context) {
        try {
            AssetManager am = context.getAssets();
            InputStream is = am.open("customPackagerIp.txt");
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            String ip = reader.readLine();
            reader.close();
            if (ip != null && !ip.isEmpty()) {
                SharedPreferences mPreferences = PreferenceManager.getDefaultSharedPreferences(context);
                String defaultIp = mPreferences.getString("debug_http_host", null);
                if (defaultIp == null || defaultIp.isEmpty()) {
                    SharedPreferences.Editor editor = mPreferences.edit();
                    editor.putString("debug_http_host", ip + ":8081");
                    editor.apply();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
