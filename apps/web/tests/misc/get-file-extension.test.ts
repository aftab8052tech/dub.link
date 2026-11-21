import { getFileExtension } from "@dub/utils";
import { describe, expect, it } from "vitest";

describe("getFileExtension", () => {
  it("returns uppercase file extension for URLs with valid file extensions", () => {
    expect(getFileExtension("https://dub.co/images/photo.png")).toBe("PNG");
    expect(getFileExtension("https://dub.co/documents/report.pdf")).toBe("PDF");
    expect(getFileExtension("https://dub.co/logo.svg")).toBe("SVG");
    expect(getFileExtension("https://dub.co/archive.tar.gz")).toBe("GZ");
    expect(getFileExtension("https://dub.co/photo.jpg?width=300#preview")).toBe("JPG");
  });

  it("returns null for URLs without file extensions", () => {
    expect(getFileExtension("https://dub.co/avatar")).toBeNull();
    expect(getFileExtension("https://dub.co/api/v1/users")).toBeNull();
    expect(getFileExtension("https://dub.co/")).toBeNull();
    expect(getFileExtension("https://dub.co")).toBeNull();
    expect(getFileExtension("https://dub.co/dir.with.dot/resource")).toBeNull();
    expect(getFileExtension("https://dub.co/avatar/")).toBeNull();
  });

  it("returns null for hidden dotfiles without extension", () => {
    expect(getFileExtension("https://dub.co/.gitignore")).toBeNull();
    expect(getFileExtension("https://dub.co/.env")).toBeNull();
  });

  it("handles non-URL or invalid URL strings gracefully", () => {
    expect(getFileExtension("sample/file.txt")).toBe("TXT");
    expect(getFileExtension("sample/noextension")).toBeNull();
    expect(getFileExtension("noextension")).toBeNull();
    expect(getFileExtension("")).toBeNull();
  });
});
