/**
 * Nova POS - Client Download Portal Manager
 * Handles auto version checking from versions.json and populates UI sections.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current hardcoded application client version
    const INSTALLED_OR_TARGET_VERSION = "1.0.2";

    // Fetch releases configuration from versions.json
    fetch('versions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load version manifest: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                renderVersionData(data, INSTALLED_OR_TARGET_VERSION);
            }
        })
        .catch(error => {
            console.warn('Could not auto-fetch versions.json. Utilizing static HTML fallback.', error);
        });
});

/**
 * Renders data from versions.json into the Hero, Download Card, and Archive Table.
 */
function renderVersionData(versions, currentVersion) {
    const latest = versions[0];

    // 1. Check if a newer version exists compared to client baseline
    if (latest.version !== currentVersion) {
        const updateBanner = document.getElementById('update-banner');
        const bannerVersion = document.getElementById('banner-version');
        const bannerDownloadBtn = document.getElementById('banner-download-btn');

        if (updateBanner && bannerVersion && bannerDownloadBtn) {
            bannerVersion.textContent = latest.version;
            updateBanner.classList.remove('hidden');
            bannerDownloadBtn.addEventListener('click', () => {
                window.location.href = latest.url;
            });
        }
    }

    // 2. Update Primary Download Card
    const latestBadge = document.getElementById('latest-version-badge');
    const releaseDate = document.getElementById('latest-release-date');
    const fileSize = document.getElementById('latest-file-size');
    const downloadBtn = document.getElementById('primary-download-btn');
    const changelogVersion = document.getElementById('changelog-version');
    const changelogList = document.getElementById('latest-changelog-list');

    if (latestBadge) latestBadge.textContent = `v${latest.version}`;
    if (releaseDate) releaseDate.textContent = formatDate(latest.date);
    if (fileSize && latest.size) fileSize.textContent = latest.size;
    if (downloadBtn) {
        downloadBtn.href = latest.url;
        downloadBtn.setAttribute('download', '');
    }
    if (changelogVersion) changelogVersion.textContent = latest.version;

    // Render Latest Changelog
    if (changelogList && Array.isArray(latest.changelog)) {
        changelogList.innerHTML = '';
        latest.changelog.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fa-solid fa-check"></i> ${escapeHTML(item)}`;
            changelogList.appendChild(li);
        });
    }

    // 3. Render Archive Table (Older Versions)
    const tableBody = document.getElementById('previous-versions-body');
    if (tableBody) {
        tableBody.innerHTML = '';
        
        // Render all items in versions array
        versions.forEach((rel, index) => {
            const tr = document.createElement('tr');
            
            const isLatestTag = index === 0 ? '<span style="font-size:0.75rem; background:#10b981; color:#fff; padding:2px 6px; border-radius:4px; margin-left:6px;">Latest</span>' : '';
            const changelogText = Array.isArray(rel.changelog) ? rel.changelog.join(' • ') : 'Bug fixes and performance enhancements.';
            
            tr.innerHTML = `
                <td><strong>v${escapeHTML(rel.version)}</strong>${isLatestTag}</td>
                <td>${escapeHTML(formatDate(rel.date))}</td>
                <td style="color: #94a3b8; font-size: 0.9rem;">${escapeHTML(changelogText)}</td>
                <td>
                    <a href="${escapeHTML(rel.url)}" class="btn btn-secondary btn-sm" download>
                        <i class="fa-solid fa-download"></i> Setup .exe
                    </a>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }
}

/**
 * Utility: Format string date into human readable output
 */
function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('en-US', options);
}

/**
 * Utility: Sanitize string to prevent XSS
 */
function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}