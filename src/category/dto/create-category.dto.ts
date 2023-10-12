export class CreateCategoryDto {
  /**
   * The category name
   * @example General Requirements
   */
  name: string;

  /**
   * The contract ID that this category belongs to
   * @example 846974af-cd03-499b-9014-cec03cca1ccc
   */
  contract: string;

  /**
   * The parent category ID
   * @example 846974af-cd03-499b-9014-cec03cca1ccc
   */
  parent_category?: string;
}
