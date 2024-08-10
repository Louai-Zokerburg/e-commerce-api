declare module "xss-clean" {
	import type { RequestHandler } from "express";

	// Define options for the middleware
	interface XssCleanOptions {
		// Whether to allow HTML tags. Default is false.
		allowHtml?: boolean;
		// Whether to allow certain tags. Default is false.
		allowTags?: string[];
		// Whether to allow certain attributes. Default is false.
		allowAttributes?: string[];
	}

	// Define the middleware function type
	const xssClean: (options?: XssCleanOptions) => RequestHandler;

	export default xssClean;
}
