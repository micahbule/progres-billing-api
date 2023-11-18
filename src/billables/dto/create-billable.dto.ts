export class CreateBillableDto {
  /**
   * The scope of work to be billed
   * @example Excavation Works
   */
  scope: string;

  /**
   * The quantity to be billed
   * @example 1
   */
  quantity: number;

  /**
   * The unit of measurement to be used for
   * descriptive purposes
   * @example sqm
   */
  unit: string;

  /**
   * The price per unit; can be in decimal format
   * @example 1000.00
   */
  unit_rate: number;

  /**
   * The category ID for this billable item
   * @example 846974af-cd03-499b-9014-cec03cca1ccc
   */
  category: string;

  /**
   * The amount already paid for this billable
   * @example 1000.00
   */
  accomplished_amount?: number;
}
