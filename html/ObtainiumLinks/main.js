"use strict";

/*
 * 元URLの構造:
 * https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/{URLエンコードした設定JSON}
 *
 * 既定設定 + apps.js の各アプリ固有設定を組み合わせる。
 * 各項目の独立した設定（APKフィルターやアーキテクチャ）を上書き・省略しないこと。
 */
const DEFAULT_SETTINGS = Object.freeze({
    includePrereleases: false,
    fallbackToOlderReleases: true,
    filterReleaseTitlesByRegEx: "",
    filterReleaseNotesByRegEx: "",
    verifyLatestTag: false,
    dontSortReleasesList: false,
    useLatestAssetDateAsReleaseDate: false,
    releaseTitleAsVersion: false,
    trackOnly: false,
    versionExtractionRegEx: "",
    matchGroupToUse: "",
    versionDetection: false,
    releaseDateAsVersion: false,
    useVersionCodeAsOSVersion: false,
    apkFilterRegEx: "",
    invertAPKFilter: false,
    autoApkFilterByArch: false,
    appName: "",
    shizukuPretendToBeGooglePlay: false,
    allowInsecure: false,
    exemptFromBackgroundUpdates: false,
    skipUpdateNotifications: false,
    about: "",
    refreshBeforeDownload: false
});

const apps = Array.isArray(window.OBTAINIUM_APPS) ? window.OBTAINIUM_APPS : [];
const searchInput = document.getElementById("search");
const clearButton = document.getElementById("clear-search");
const resultsElement = document.getElementById("results");
const summaryElement = document.getElementById("summary");
const emptyElement = document.getElementById("empty");
const filterButtons = document.querySelectorAll("[data-architecture]");
let selectedArchitecture = "すべて";

function createObtainiumUrl(app) {
    const settings = Object.assign({}, DEFAULT_SETTINGS, app.settings || {});
    // 旧ソート指定と新しいソート指定を同時に送らない。
    if (Object.prototype.hasOwnProperty.call(settings, "sortMethodChoice")) {
        delete settings.dontSortReleasesList;
    }

    const payload = {
        id: app.id,
        url: app.repository,
        author: app.author,
        name: app.name,
        preferredApkIndex: 0,
        additionalSettings: JSON.stringify(settings),
        overrideSource: app.overrideSource === undefined ? null : app.overrideSource
    };

    return "https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/" +
        encodeURIComponent(JSON.stringify(payload));
}

function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) {
        node.className = className;
    }
    if (text !== undefined) {
        node.textContent = text;
    }
    return node;
}

function createCard(app) {
    const card = element("article", "app-card");
    const mainLink = element("a", "app-link");
    mainLink.href = createObtainiumUrl(app);
    mainLink.setAttribute("aria-label", app.title + " " + app.architecture + " をObtainiumに追加");

    const heading = element("div", "app-card-heading");
    const title = element("h3", "app-title", app.title);
    const badge = element("span", "architecture-tag", app.architecture);
    heading.append(title, badge);

    const description = element("p", "app-description", app.description);
    const cta = element("span", "app-cta", "Obtainiumに追加 ↗");
    mainLink.append(heading, description, cta);

    const actions = element("div", "app-actions");
    const source = element("a", "source-link", "GitHubの配布元を開く ↗");
    source.href = app.repository;
    source.target = "_blank";
    source.rel = "noopener noreferrer";

    const copyButton = element("button", "copy-link", "登録URLをコピー");
    copyButton.type = "button";
    copyButton.addEventListener("click", async function () {
        const url = createObtainiumUrl(app);
        try {
            if (!navigator.clipboard || !navigator.clipboard.writeText) {
                throw new Error("Clipboard API unavailable");
            }
            await navigator.clipboard.writeText(url);
            copyButton.textContent = "コピーしたぞ";
        } catch (error) {
            const temp = element("textarea");
            temp.value = url;
            temp.setAttribute("readonly", "");
            temp.style.position = "fixed";
            temp.style.opacity = "0";
            document.body.append(temp);
            temp.select();
            const copied = document.execCommand("copy");
            temp.remove();
            copyButton.textContent = copied ? "コピーしたぞ" : "コピーできなかった";
        }
        window.setTimeout(function () {
            copyButton.textContent = "登録URLをコピー";
        }, 2000);
    });

    actions.append(source, copyButton);
    card.append(mainLink, actions);
    return card;
}

function matches(app, query) {
    if (selectedArchitecture !== "すべて" &&
        app.architecture !== selectedArchitecture) {
        return false;
    }
    if (!query) {
        return true;
    }
    const fields = [
        app.title, app.description, app.category, app.architecture,
        app.name, app.repository, app.id
    ];
    return fields.join(" ").toLocaleLowerCase().includes(query);
}

function render() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const filtered = apps.filter(function (app) {
        return matches(app, query);
    });

    resultsElement.replaceChildren();
    const categories = [...new Set(filtered.map(function (app) {
        return app.category;
    }))];

    categories.forEach(function (category) {
        const section = element("section", "category-section");
        const heading = element("h2", "category-heading", category);
        const grid = element("div", "app-grid");
        filtered.filter(function (app) {
            return app.category === category;
        }).forEach(function (app) {
            grid.append(createCard(app));
        });
        section.append(heading, grid);
        resultsElement.append(section);
    });

    summaryElement.textContent = filtered.length + " 件 / 全 " + apps.length + " 件";
    emptyElement.hidden = filtered.length !== 0;
    clearButton.hidden = searchInput.value.length === 0;
}

searchInput.addEventListener("input", render);
clearButton.addEventListener("click", function () {
    searchInput.value = "";
    searchInput.focus();
    render();
});
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedArchitecture = button.dataset.architecture;
        filterButtons.forEach(function (item) {
            item.setAttribute(
                "aria-pressed",
                String(item.dataset.architecture === selectedArchitecture)
            );
        });
        render();
    });
});

render();
