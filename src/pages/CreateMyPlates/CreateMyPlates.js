import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import './CreateMyPlates.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';

function CreateMyPlate() {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: 'ingredientsBreakdown'
  });
  const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
    control,
    name: 'steps'
  });

  const [keywords, setKeywords] = useState([]);
  const [servingSize, setServingSize] = useState('');
  const [ingredientMode, setIngredientMode] = useState('breakdown');

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append('recipeTitle', data.recipeTitle);
    formData.append('photo', data.photo[0]);
    formData.append('description', data.description);
    formData.append('keywords', keywords.join(', '));
    formData.append('servings', servingSize);
    formData.append('cookTime', `${data.cookHours}:${data.cookMinutes}`);
    formData.append('ingredients', JSON.stringify(ingredientMode === 'breakdown' ? data.ingredientsBreakdown : data.ingredientsAllAtOnce));
    formData.append('instructions', JSON.stringify(data.steps));
    formData.append('videoLink', data.videoLink);
    formData.append('referenceLink', data.referenceLink);
    formData.append('additionalNotes', data.additionalNotes);

    console.log("Form submitted:", Object.fromEntries(formData));
  };

  const handleAddKeyword = (e) => {
    e.preventDefault();
    const newKeyword = e.target.keyword.value.trim();
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      e.target.keyword.value = '';
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  return (
    <div className="create-my-plate">
      <Sidebar />
      <main className="main-content">
        <h1>Create My Plates</h1>
        <form className="recipe-form" onSubmit={handleSubmit(onSubmit)}>

          {/* Recipe Overview Section */}
          <section className="recipe-overview">
            <label htmlFor="recipeTitle">Recipe Title</label>
            <input type="text" id="recipeTitle" placeholder="Type your recipe title here" {...register('recipeTitle')} />

            <label htmlFor="photoUpload">Photo/Video</label>
            <div className="upload-photo-video">
              <input type="file" id="photoUpload" {...register('photo')} />
              <span>Upload Photo/Video</span>
            </div>

            <label htmlFor="description">Description</label>
            <textarea id="description" placeholder="Type your description here" {...register('description')}></textarea>

            {/* Keywords Section */}
            <label htmlFor="keywords">Keywords</label>
            <div className="keywords">
              <form onSubmit={handleAddKeyword}>
                <input type="text" id="keyword" placeholder="Add a keyword" />
                <button type="submit">Add</button>
              </form>
              <div className="keywords-list">
                {keywords.map((keyword, index) => (
                  <span key={index} onClick={() => handleRemoveKeyword(keyword)}>
                    {keyword} <button type="button">&times;</button>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Cooking Details Section */}
          <section className="cooking-details">
            <h2>Cooking Details</h2>

            {/* Servings Input */}
            <div className="servings">
              <label>Servings</label>
              <div className="servings-options">
                {[...Array(9)].map((_, i) => (
                  <button type="button" key={i} onClick={() => setServingSize(i + 1)}>
                    {i + 1}
                  </button>
                ))}
                <button type="button" onClick={() => setServingSize('NA')}>NA</button>
                <input
                  type="number"
                  placeholder="Custom"
                  value={servingSize}
                  onChange={(e) => setServingSize(e.target.value)}
                />
              </div>
            </div>

            {/* Cook Time Input */}
            <div className="cook-time">
              <label>Cook Time</label>
              <div className="time-inputs">
                <input type="number" placeholder="00" {...register('cookHours')} /> :
                <input type="number" placeholder="00" {...register('cookMinutes')} />
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="ingredients">
              <label>Ingredients</label>
              <div className="ingredients-options">
                <div>
                  <input
                    type="radio"
                    id="byIngredient"
                    name="ingredientsMode"
                    value="breakdown"
                    checked={ingredientMode === 'breakdown'}
                    onChange={() => setIngredientMode('breakdown')}
                  />
                  <label htmlFor="byIngredient">Break Down by Ingredient</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="allAtOnce"
                    name="ingredientsMode"
                    value="allAtOnce"
                    checked={ingredientMode === 'allAtOnce'}
                    onChange={() => setIngredientMode('allAtOnce')}
                  />
                  <label htmlFor="allAtOnce">All Ingredients at Once</label>
                </div>
              </div>

              {ingredientMode === 'breakdown' ? (
                <div className="ingredient-inputs">
                  {ingredientFields.map((field, index) => (
                    <div key={field.id} className="ingredient-item">
                      <input
                        type="text"
                        placeholder="Ingredient"
                        {...register(`ingredientsBreakdown.${index}.name`)}
                      />
                      <input
                        type="text"
                        placeholder="Quantity"
                        {...register(`ingredientsBreakdown.${index}.quantity`)}
                      />
                      <select {...register(`ingredientsBreakdown.${index}.measurement`)}>
                        <option>Measurement</option>
                        <option>Cups</option>
                        <option>Grams</option>
                      </select>
                      <button type="button" onClick={() => removeIngredient(index)}>&times;</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => appendIngredient({ name: '', quantity: '', measurement: '' })}>
                    + Add more ingredients
                  </button>
                </div>
              ) : (
                <textarea placeholder="List all ingredients here" {...register('ingredientsAllAtOnce')}></textarea>
              )}
            </div>
          </section>

          {/* How To Section */}
          <section className="how-to">
            <h2>How to</h2>
            <div className="steps">
              {stepFields.map((field, index) => (
                <div key={field.id} className="step">
                  <label>{`Step ${index + 1}`}</label>
                  <textarea placeholder="Text here" {...register(`steps.${index}.instruction`)}></textarea>
                  <button type="button">Add photo or video</button>
                  <button type="button" onClick={() => removeStep(index)}>&times;</button>
                </div>
              ))}
              <button type="button" onClick={() => appendStep({ instruction: '' })}>
                + Add more steps
              </button>
            </div>
          </section>

          {/* Extras & References Section */}
          <section className="extras-references">
            <h2>Extras & References</h2>
            <label htmlFor="videoLink">Video link</label>
            <input type="url" id="videoLink" placeholder="Paste your video link here" {...register('videoLink')} />

            <label htmlFor="referenceLink">Reference Link</label>
            <input type="url" id="referenceLink" placeholder="Put your reference link here" {...register('referenceLink')} />

            <label htmlFor="additionalNotes">Additional Notes</label>
            <textarea id="additionalNotes" placeholder="Text here" {...register('additionalNotes')}></textarea>
          </section>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="submit">Post My Plate</button>
            <button type="button" onClick={() => reset()}>Save Changes</button>
            <button type="button" onClick={() => reset()}>Discard Changes</button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default CreateMyPlate;
