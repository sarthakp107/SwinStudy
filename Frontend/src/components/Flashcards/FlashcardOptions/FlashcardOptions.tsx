import { CreateFlashcardsOption } from "./CreateFlashcardsOption"
import { RandomPreviouslyStudiedFlashcardsOption } from "./RandomPreviouslyStudiedFlashcardsOption"
import { TestOption } from "./TestOption"
import { ViewSavedFlashcardsOption } from "./ViewSavedFlashcardsOption"

export const FlashcardOptions = ()=>{
    return(
    <>
    <div>
        <CreateFlashcardsOption />
        <ViewSavedFlashcardsOption />
        <RandomPreviouslyStudiedFlashcardsOption />
        <TestOption />
    </div>
    </>)
}