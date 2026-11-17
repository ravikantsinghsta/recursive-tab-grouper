
let groupQueue = Promise.resolve();

function enqueue(task) {
  groupQueue = groupQueue
    .catch(() => {})
    .then(task);

  return groupQueue;
}

async function getNextGroupName() {
  const groups = await chrome.tabGroups.query({});

  const numbers = groups
    .map(group => {
      const match = group.title?.match(/^Tab Group (\d+)$/);
      return match ? Number(match[1]) : 0;
    });

  const nextNumber = Math.max(0, ...numbers) + 1;

  return `Tab Group ${nextNumber}`;
}

chrome.tabs.onCreated.addListener((tab) => {
  if (tab.openerTabId == null) return;

  enqueue(async () => {
    try {
      const child = await chrome.tabs.get(tab.id);
      const parent = await chrome.tabs.get(tab.openerTabId);

      if (child.windowId !== parent.windowId) return;
      if (child.pinned || parent.pinned) return;
      if (child.groupId !== -1) return;

      if (parent.groupId !== -1) {
        // Join the parent's existing group.
        await chrome.tabs.group({
          tabIds: [child.id],
          groupId: parent.groupId
        });

      } else {
        // Create a new group with a dynamic name.
        const groupName = await getNextGroupName();

        const groupId = await chrome.tabs.group({
          tabIds: [parent.id, child.id]
        });

        await chrome.tabGroups.update(groupId, {
          title: groupName,
          color: "blue"
        });

        console.log(`Created ${groupName}`);
      }

    } catch (error) {
      console.error("Recursive Tab Grouper:", error);
    }
  });
});

