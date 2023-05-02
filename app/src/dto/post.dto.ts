import { Expose } from "class-transformer";

export class PostDto {
  public readonly id: number = 0;

  public readonly title: string = "";

  public readonly content: string = "";

  @Expose({ name: "created_at" })
  public readonly createdAt: string = "";

  public readonly password: string = "";
}
