import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {ModuleOptions} from "webpack";
import {buildBabelLoader} from "./babel/buildBabelLoader";
import {BuildOptions} from "./types/types";
export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isProd = options.mode === "production";
  const isDev = options.mode === "development";

  const babelLoader = buildBabelLoader(options);

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [{name: "convertColors", params: {currentColor: true}}],
          },
        },
      },
    ],
  };

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
    generator: {
      filename: "images/[hash][ext][query]",
    },
  };
  const fontsLoader = {
    test: /\.(woff|woff2)$/i,
    type: "asset/resource",
    generator: {
      filename: "fonts/[hash][ext][query]",
    },
  };
  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        auto: (resPath: string) => Boolean(resPath.includes("module.scss")),
        localIdentName: isDev
          ? "[path][name]__[local]--[hash:base64:5]"
          : "[hash:base64:8]",
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      cssLoaderWithModules,
      "sass-loader",
    ],
  };

  /** используем Babel для транспиляции ts, tsx */
  // const tsLoader = {
  //   test: /\.tsx?$/,
  //   use: [
  //     {
  //       loader: "ts-loader",
  //       options: {
  //         getCustomTransformers: () => ({
  //           before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
  //         }),
  //         transpileOnly: true,
  //       },
  //     },
  //   ],
  //   exclude: /node_modules/,
  // };

  return [
    fontsLoader,
    assetLoader,
    // tsLoader,
    babelLoader,
    svgrLoader,
    scssLoader,
  ];
}
