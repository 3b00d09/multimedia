<script lang="ts">
  import type { NotificationType } from "$lib/helpers/types";

  import PostLike from  "$lib/components/notification/PostLike.svelte";
  import CommentLike from "$lib/components/notification/CommentLike.svelte";
  import PostComment from "$lib/components/notification/PostComment.svelte";

    const components = [
        {type: "post_like", component: PostLike},
        {type: "comment_like", component: CommentLike},
        {type: "comment", component: PostComment},
        {type: "reply", component: PostComment}
    ]

    export let notification: NotificationType;
    let targetComponent: typeof PostLike;


    $:{
      if(notification){
        const temp = components.find((item)=>{
          if(item.type === notification.notification.entityType) return item.component
        })
        if(temp?.component) targetComponent = temp.component
      }
    }
</script>

{#if targetComponent}
  <svelte:component this={targetComponent} {notification}/>
{/if}
