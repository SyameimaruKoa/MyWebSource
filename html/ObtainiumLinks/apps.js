/*
 * Obtainium リンク集の登録データ
 *
 * 追記方法:
 * 1. 下の配列に { ... } を1件追加する。
 * 2. title / category / description / architecture / id / repository / author / name を指定する。
 * 3. 元のObtainium設定と異なる値だけを settings に記載する。
 * 4. GitHubに反映すると、新しいリンクが自動表示される。
 *
 * settings の既定値は main.js の DEFAULT_SETTINGS を参照。
 * APKフィルターの正規表現では、バックスラッシュを二重に書く（例: "\\.apk$"）。
 * リンク先の長いURLを手作業で編集する必要はない。
 *
 * ユーザー提供リンクの設定値を維持。似たアプリやアーキテクチャの違いを統合しない。
 */
window.OBTAINIUM_APPS = [
    {
        title: "ServerBox",
        category: "ユーティリティ",
        description: "サーバー管理アプリ。ARM64版APKを指定",
        architecture: "ARM64",
        id: "tech.lolli.toolbox",
        repository: "https://github.com/lollipopkit/flutter_server_box",
        author: "lollipopkit",
        name: "ServerBox",
        overrideSource: "GitHub",
        settings: {
            fallbackToOlderReleases: false,
            versionDetection: true,
            apkFilterRegEx: "^ServerBox_(?:v[0-9.]+_)?arm64\\.apk$"
        }
    },
    {
        title: "Twitter Piko",
        category: "カスタムアプリ",
        description: "TwitterのPiko版。指定されたAPK名で抽出",
        architecture: "共通",
        id: "com.twitter.android",
        repository: "https://github.com/j-hc/revanced-magisk-module",
        author: "j-hc",
        name: "Twitter",
        settings: {
            versionDetection: true,
            sortMethodChoice: "date",
            apkFilterRegEx: "^twitter-piko-v\\d+\\.\\d+\\.\\d+-(?:prod|release)\\.\\d+-all\\.apk$",
            appName: "Twitter Piko",
            appAuthor: "",
            includeZips: false,
            zippedApkFilterRegEx: ""
        }
    },
    {
        title: "Google Photo ReVanced",
        category: "カスタムアプリ",
        description: "GoogleフォトのReVanced版。ARM64向け",
        architecture: "ARM64",
        id: "app.revanced.android.photos",
        repository: "https://github.com/j-hc/revanced-magisk-module",
        author: "j-hc",
        name: "revanced-magisk-module",
        settings: {
            useLatestAssetDateAsReleaseDate: true,
            apkFilterRegEx: "^googlephotos-revanced-(?:v[0-9.]+-)?arm64-v8a\\.apk$",
            appName: "Google Photo ReVanced",
            skipUpdateNotifications: true
        }
    },
    {
        title: "YouTube Morphe",
        category: "カスタムアプリ",
        description: "YouTube Morphe。all APK・アーキテクチャ自動判定",
        architecture: "共通",
        id: "app.morphe.android.youtube",
        repository: "https://github.com/j-hc/revanced-magisk-module",
        author: "j-hc",
        name: "YouTube",
        settings: {
            useLatestAssetDateAsReleaseDate: true,
            apkFilterRegEx: "^youtube-morphe-(?:v[0-9.]+-)?all\\.apk$",
            autoApkFilterByArch: true,
            appName: "YouTube Morphe",
            skipUpdateNotifications: true
        }
    },
    {
        title: "microG Services - Morphe",
        category: "microG",
        description: "アプリアイコン付き・64bit版",
        architecture: "ARM64",
        id: "app.revanced.android.gms",
        repository: "https://github.com/MorpheApp/MicroG-RE",
        author: "MorpheApp",
        name: "microG Services - Morphe (arm64-v8a, Icon)",
        settings: {
            releaseDateAsVersion: true,
            apkFilterRegEx: "^microg-.*-icon-arm64-v8a\\.apk$"
        }
    },
    {
        title: "microG Services - Morphe",
        category: "microG",
        description: "アプリアイコン付き・32bit版",
        architecture: "ARMv7",
        id: "app.revanced.android.gms",
        repository: "https://github.com/MorpheApp/MicroG-RE",
        author: "MorpheApp",
        name: "microG Services - Morphe (armeabi-v7a, Icon)",
        settings: {
            releaseDateAsVersion: true,
            apkFilterRegEx: "^microg-.*-icon-armeabi-v7a\\.apk$"
        }
    },
    {
        title: "YouTube Music Morphe",
        category: "カスタムアプリ",
        description: "YouTube Music Morphe・64bit版",
        architecture: "ARM64",
        id: "app.morphe.android.apps.youtube.music",
        repository: "https://github.com/j-hc/revanced-magisk-module",
        author: "j-hc",
        name: "YouTube Music",
        settings: {
            useLatestAssetDateAsReleaseDate: true,
            apkFilterRegEx: "^music-morphe-(?:v[0-9.]+-)?arm64-v8a\\.apk$",
            appName: "YouTube Music Morphe",
            skipUpdateNotifications: true
        }
    },
    {
        title: "YouTube Music Morphe",
        category: "カスタムアプリ",
        description: "YouTube Music Morphe・32bit版",
        architecture: "ARMv7",
        id: "app.morphe.android.apps.youtube.music",
        repository: "https://github.com/j-hc/revanced-magisk-module",
        author: "j-hc",
        name: "YouTube Music",
        settings: {
            useLatestAssetDateAsReleaseDate: true,
            apkFilterRegEx: "^music-morphe-(?:v[0-9.]+-)?arm-v7a\\.apk$",
            appName: "YouTube Music Morphe",
            skipUpdateNotifications: true
        }
    }
];
