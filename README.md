# Recursive Tab Grouper

Automatically organize your browsing by grouping newly opened tabs with their parent tab.

**Recursive Tab Grouper** is a lightweight browser extension for Chromium-based browsers, including Google Chrome and Brave. It automatically places newly opened tabs into the same tab group as their parent. This grouping continues recursively, keeping related browsing tabs together.

## Features

- **Automatic Tab Grouping:** Automatically groups a newly opened tab with its parent.
- **Recursive Grouping:** Descendant tabs inherit the same group as their parent, regardless of how many levels deep the browsing chain goes.
- **Dynamic Group Naming:** Automatically names groups sequentially, such as `Tab Group 1`, `Tab Group 2`, `Tab Group 3`, and so on.
- **Multiple Independent Groups:** Maintains separate groups for independent browsing sessions.
- **Native Tab Groups:** Uses the browser's built-in tab grouping functionality.
- **Lightweight:** Runs in the background without requiring an external server.

## How It Works

Recursive Tab Grouper follows the relationship between newly created tabs and their opener tabs.

1. When a new tab is opened from an existing tab, the extension identifies its parent.
2. If the parent already belongs to a tab group, the new tab joins that group.
3. If the parent is not grouped, the extension creates a new group containing both tabs.
4. Every subsequent descendant tab automatically joins the same group.

### Example

Suppose you start browsing from Google:

```text
Google
  └── Wikipedia
        └── Reddit
              └── GitHub
                    └── Stack Overflow
```

All these tabs remain together in:

```text
Tab Group 1
```

Opening an unrelated link from another ungrouped tab creates a separate group:

```text
Tab Group 1
  ├── Google
  ├── Wikipedia
  ├── Reddit
  ├── GitHub
  └── Stack Overflow

Tab Group 2
  ├── YouTube
  └── IMDb
```

## Installation

### Install from Source

1. Clone this repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/recursive-tab-grouper.git
   ```

2. Open your Chromium-based browser and navigate to its extensions page:

   **Google Chrome:**
   ```text
   chrome://extensions/
   ```

   **Brave:**
   ```text
   brave://extensions/
   ```

3. Enable **Developer mode**.

4. Click **Load unpacked**.

5. Select the cloned `recursive-tab-grouper` directory.

6. The extension is now installed and ready to use.

## Supported Browsers

- Google Chrome
- Brave Browser
- Other Chromium-based browsers supporting the required extension APIs

## Usage

1. Open any webpage.
2. Use `Command (⌘) + Click` on macOS to open a link in a new tab.
3. The extension automatically groups the original tab and its newly opened tab.
4. Continue opening links from grouped tabs.
5. All descendant tabs will automatically join the same group.

No manual grouping is required.

**Note:** The extension identifies parent-child relationships using the browser's opener-tab information. It does not directly detect the Command key or other mouse modifiers.

## Technical Details

| Component | Technology |
|---|---|
| Language | JavaScript |
| Extension Format | Chrome Extensions Manifest V3 |
| Browser APIs | Tabs API, Tab Groups API |
| Background Execution | Extension Service Worker |
| External Dependencies | None |

### Permissions

The extension uses the following permission:

| Permission | Purpose |
|---|---|
| `tabGroups` | Create and manage native browser tab groups |

The extension also uses browser-provided tab lifecycle events and opener information to identify parent-child tab relationships.

## Limitations

- Tabs opened without an identifiable opener relationship are not automatically grouped.
- Pinned tabs are excluded from automatic grouping.
- The extension relies on browser support for the `tabs` and `tabGroups` APIs.
- Tabs opened in a different browser window are not grouped with their parent.
- Group numbering is based on existing group names matching the `Tab Group N` format. If all numbered groups are closed, numbering can restart at 1.
- Modifier-key detection is not performed directly. The extension uses the browser's opener-tab relationship to identify newly opened tabs.

## Privacy

Recursive Tab Grouper is designed to operate locally within the browser.

- No account registration is required.
- No external server is required.
- No browsing history is transmitted.
- No analytics or tracking are included.

## Project Structure

```text
recursive-tab-grouper/
│
├── manifest.json
├── background.js
├── README.md
├── LICENSE
└── .gitignore
```

## Contributing

Contributions, suggestions, bug reports, and feature requests are welcome.

1. Fork this repository.
2. Create a new branch for your changes.
3. Commit your changes with descriptive commit messages.
4. Open a Pull Request explaining your improvements.

## License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE) file for details.

---

**Made to keep your browsing organized.**