import { NextFunction, Request, Response } from "express";
import { z, ZodType } from "zod";

const originalUrlSchema = z.object({
  originalURL: z.url("Invalid URL format"),
});

const slugParamSchema = z.object({
  slug: z.string().length(10),
});

const validateOriginalUrlBody =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues.map((issue) => issue.message).join(", ");
      return res.status(400).json({ error: message });
    }

    req.body = result.data;
    next();
  };

const validateSlugParams =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      const message = result.error.issues.map((issue) => issue.message).join(", ");
      return res.status(400).json({
        error: "Invalid params",
        details: message,
      });
    }

    req.body = result.data;
    next();
  };

export { validateSlugParams, validateOriginalUrlBody, originalUrlSchema, slugParamSchema };
