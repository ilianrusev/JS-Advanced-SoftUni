import { createGame } from "../api/data.js";
import { html } from "../helper.js";


const createTemplate = (onSubmit) => html`
<section id="create-page" class="auth">
    <form @submit=${onSubmit} id="create">
        <div class="container">

            <h1>Create Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" placeholder="Enter game title...">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" placeholder="Enter game category...">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"></textarea>
            <input class="btn submit" type="submit" value="Create Game">
        </div>
    </form>
</section>`

export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit))

    async function onSubmit(ev) {
        ev.preventDefault()

        const form = new FormData(ev.target)

        const title = form.get("title")
        const category = form.get("category")
        const maxLevel = form.get("maxLevel")
        const imageUrl = form.get("imageUrl")
        const summary = form.get("summary")

        try {
            if (!title || !category || !maxLevel || !imageUrl || !summary) {
                throw new Error("All fields are required!")
            }
            await createGame(title, category, maxLevel, imageUrl, summary)
            ctx.page.redirect("/home")
        } catch (err) {
            alert(err.message)
        }
    }
}