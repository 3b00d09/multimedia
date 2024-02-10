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

  /**https://codepen.io/lideo/pen/KKGeQG*/
  .notifications-container {
    display: none;
    width: max-content;
    color: #fff;
    position: absolute;
    padding: 1rem;
    border-radius: 10%;
    right: -30px;
    top: 50px;
    background-color: black;
  }

  .notifications-container:after {
    content: " ";
    position: absolute;
    right: 30px;
    top: -15px;
    border-top: none;
    border-right: 15px solid transparent;
    border-left: 15px solid transparent;
    border-bottom: 15px solid black;
  }

  .notification {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    cursor: pointer;
  }

  .active {
    display: grid;
    gap: 1rem;
  }

  .unread {
    background-color: rgba(226, 224, 224, 0.075);
  }
</style>
