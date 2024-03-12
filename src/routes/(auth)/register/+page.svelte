<div class="container">
  <div class="header">
		<h1 class="active">Sign up</h1>
		<h2><a href="/login">Log in</a></h2>
</div>

 <form method="post" class="form">

	<input required type="text" name="username" placeholder="Username"/>

	<input required type="password" name="password" placeholder="Password"/>

	<input required type="password" name="password" placeholder="Repeat Password"/>
	<button type="submit">Sign up</button>
</form>

</div>


<style>
	.container {
			display: grid;
			place-items: center;
			height: 100%;
			border: 1px solid hsl(240, 3.7%, 15.9%);
			border-radius: 0.5rem;
			width: 50%;
			justify-self: center;
			gap: 1rem;
	}
	
	.header {
			display: flex;
			justify-content: space-between;
			place-self: start;
			padding: 2rem;
			width: 100%;
	}
	
	
	h1{
			font-size: 1.5rem;
			line-height: 2rem;
			letter-spacing: -0.025em;
	}
	

	h2{
			
			font-size: 1.5rem;
			line-height: 2rem;
			letter-spacing: -0.025em;
	}
	
	input {
			flex-grow: 1;
			padding: 1rem;
			border-radius: 1rem;
			flex-basis: 90%;
			height: auto;
			box-shadow: -2px -2px 6px -4px rgba(226, 224, 224, 0.5) inset, 2px 2px 6px 4px rgba(0, 0, 0, 0.5) inset;
			background-color: transparent;
			border: none;
			color: inherit;
			font: inherit;
			resize: none;
			transition: border-radius 0.5s;
	}
	
	
	a{
			color: inherit;
			text-decoration: inherit;
	}
	
	.form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 75%;
    padding: 0.5rem;
}

	button {
					background-color: var(--action);
					color: white;
					padding: 10px 15px;
					border: none;
					border-radius: 0.5rem;
					font-family: inherit;
					font-size: inherit;
					cursor: pointer;
					transition: background-color 0.3s ease;
			}
	
			.active{
					position: relative;
			}
	
			.active::before{
					content:"";
					position: absolute;
					top: 0;
					left: 50%;
					bottom :-1rem;
					height: 5rem;
					transform: rotate(90deg); 
					width: 100%;
					background-color: var(--action);
					filter: drop-shadow(0px 0px 5px rgba(108, 92, 214, 0.50));
					width: 2px;
			}
	</style>