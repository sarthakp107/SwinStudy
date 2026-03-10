import { CreateFlashcardsOption } from "./CreateFlashcardsOption"
import { RandomPreviouslyStudiedFlashcardsOption } from "./RandomPreviouslyStudiedFlashcardsOption"
import { TestOption } from "./TestOption"
import { ViewSavedFlashcardsOption } from "./ViewSavedFlashcardsOption"

export const FlashcardOptions = ()=>{
    return(
    <>
    <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4 p-4">
        <CreateFlashcardsOption />
        <ViewSavedFlashcardsOption />
        <RandomPreviouslyStudiedFlashcardsOption />
        <TestOption />
    </div>
    </>)
}