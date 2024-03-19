<script lang="ts">
    import { enhance } from "$app/forms";
  
      export let commentId:string;
      export let postId:string;
  </script>
  
  
  <form method="post" action="/?/reply" use:enhance>
      <textarea name="reply-content" placeholder="Add reply..."></textarea>
      <button class="submit-btn" type="submit">Reply</button>
      <input type="hidden" name="parent_comment_id" value={`${commentId}`}/>
      <input type="hidden" name="postId" value={`${postId}`}/>
      
  </form>
  
  
  
  <style>
  
      form{
          width: 100%;
          display: grid;
          gap: 1rem;
          flex-wrap: wrap;
      }
      textarea{
          padding: 1rem;
          border-radius: 1rem;
          flex-basis: 100%;
          height: auto;
          box-shadow: -2px -2px 6px -4px rgba(226, 224, 224, 0.5) inset, 2px 2px 6px 4px rgba(0, 0, 0, 0.5) inset;
          background-color: transparent;
          border: none;
          color: inherit;
          font: inherit;
          resize: none;
          transition: border-radius 0.5s;
      }
  
      .submit-btn{
          /**dont ask*/
          font-size: .875rem;
          border: none;
          background-color: var(--action);
          padding: 0.5rem 1rem;
          color: inherit;
          width: 25%;
          justify-self: flex-end;
      }
  </style>