<script lang="ts">
  import type { NotificationType } from "$lib/types";

  export let notification: NotificationType;
  const readNotification = async () => {
    await fetch("/api/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notificationId: notification.notifications.id }),
    });
  };
</script>

{#if !notification.notifications.commentId}
  {#if notification.notifications.type === "like"}
    <a href={`/post/${notification.notifications.postId}`}>
      <button on:click={readNotification}>
        <div
          class={`notification ${
            notification.notifications.read ? "read" : "unread"
          }`}
        >
          <img src="/images/icons/like.png" alt="Heart Icon" />
          <img src={notification.user?.profilePictureUrl} alt="Profile Icon" />
          <p>{`${notification.user?.username} liked your post`}</p>
        </div>
      </button>
    </a>
  {/if}
{:else if notification.notifications.commentId}
  <a
    href={`/post/${notification.notifications.postId}/${notification.notifications.commentId}`}
  >
    <button on:click={readNotification}>
      <div
        class={`notification ${
          notification.notifications.read ? "read" : "unread"
        }`}
      >
        <img src="/images/icons/comment.png" alt="Heart Icon" />
        <img src={notification.user?.profilePictureUrl} alt="Profile Icon" />
        <p>{`${notification.user?.username} commented on your post`}</p>
      </div>
    </button>
  </a>
{/if}

<style>
  a {
    all: unset;
  }
  img {
    width: 26px;
    cursor: pointer;
  }
  button {
    all: unset;
    position: relative;
  }

  .container {
    display: flex;
    flex-direction: column;
  }

  .notification {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 16px;
  }

  .unread {
    background-color: rgba(226, 224, 224, 0.075);
  }
</style>
