import {
  NextResponse,
} from "next/server";

import {
  resolveThemeContext,
} from "@/lib/theme/resolver";

export const revalidate = 21600;

export async function GET() {
  try {
    const context =
      await resolveThemeContext();

    return NextResponse.json(
      context,
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=21600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error(
      "Error resolviendo tema dinámico:",
      error
    );

    return NextResponse.json(
      {
        error:
          "No fue posible resolver el tema dinámico.",
      },
      {
        status: 500,
      }
    );
  }
}