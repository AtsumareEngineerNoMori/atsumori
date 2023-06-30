import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ScoutIsland from "@/views/Scout/ScoutIsland.vue";
// import { RouterLink } from "vue-router";

describe("ScoutIsland", () => {
  it("検索フォーム・ボタンが正しく表示されること", () => {
    const wrapper = mount(ScoutIsland);
    expect(wrapper.find("input[type='search']").exists()).toBe(true);
    expect(wrapper.find("input[type='submit']").exists()).toBe(true);
  });

  it("20文字以上入力でエラーメッセージ表示されること", async () => {
    const wrapper = mount(ScoutIsland);
    await wrapper
      .find('input[type="search"]')
      .setValue("20文字より多いキーワードを入力aaaaaaaaaaaaaaaaa");
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".search_errmsg").text()).toBe(
      "20文字以内で入力してください"
    );
  });

  it("検索結果がない場合にメッセージ表示されること", async () => {
    const wrapper = mount(ScoutIsland, {
      props: {
        islands: [], // 空の配列を渡すことで検索結果がない状態を再現
      },
    });
    await wrapper.find("input[type='search']").setValue("キーワード");
    await wrapper.find("form").trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    const message = wrapper.find(".search_no p").text();
    expect(message).toBe("検索結果はありません");
  });


  

  //   it("該当するデータがある場合にiconとislandNameが表示されること", async () => {
  //     const islands = [
  //       {
  //         id: 1,
  //         icon: "island1.png",
  //         islandName: "ひらがなアイランド",
  //         JoinProjects: [],
  //       },
  //     ];

  //     const wrapper = mount(ScoutIsland, {
  //       props: {
  //         islands: [...islands],
  //       },
  //     });
  //     wrapper.find(".search_btn").trigger("click");
  //     await wrapper.find("input[type='search']").setValue("ひらがな");
  //     await wrapper.find("form").trigger("submit.prevent");

  //     await wrapper.vm.$nextTick();

  //     const searchResultsExist = wrapper
  //       .find(".search_list .search_result")
  //       .exists();
  //     expect(searchResultsExist).toBe(true);
  //   });

  //   it("曖昧検索ができること", async () => {
  //     // const wrapper = mount(ScoutIsland);
  //     const islands = [
  //       {
  //         id: 1,
  //         icon: "island1.png",
  //         islandName: "ひらがなアイランド",
  //         JoinProjects: [],
  //       },
  //       {
  //         id: 2,
  //         icon: "island2.png",
  //         islandName: "カタカナアイランド",
  //         JoinProjects: [],
  //       },
  //       {
  //         id: 3,
  //         icon: "island3.png",
  //         islandName: "ひらがなカタカナアイランド",
  //         JoinProjects: [],
  //       },
  //     ];
  //     // //islandsをコンポーネントのデータとして設定
  //     // await wrapper.setData({ islands });
  //     const wrapper = mount(ScoutIsland, {
  //       props: {
  //         islands: [...islands], // データをpropsとして渡す
  //       },
  //     });

  //     //ひらがなで検索
  //     await wrapper.find("input[type='search']").setValue("ひらがな");
  //     console.log("コンソール確認", wrapper.vm.filteredIslands); // デバッグ情報の出力

  //     await wrapper.find("form").trigger("submit.prevent");

  //     await wrapper.vm.$nextTick();

  //     expect(wrapper.vm.filteredIslands).toEqual([
  //       {
  //         id: 1,
  //         icon: "island1.png",
  //         islandName: "ひらがなアイランド",
  //         JoinProjects: [],
  //       },
  //       {
  //         id: 3,
  //         icon: "island3.png",
  //         islandName: "ひらがなカタカナアイランド",
  //         JoinProjects: [],
  //       },
  //     ]);

  //     // カタカナで検索
  //     await wrapper.find('input[type="search"]').setValue("カタカナ");
  //     await wrapper.find("form").trigger("submit.prevent");
  //     expect(wrapper.vm.filteredIslands).toEqual([
  //       {
  //         id: 2,
  //         icon: "island2.png",
  //         islandName: "カタカナアイランド",
  //         JoinProjects: [],
  //       },
  //       {
  //         id: 3,
  //         icon: "island3.png",
  //         islandName: "ひらがなカタカナアイランド",
  //         JoinProjects: [],
  //       },
  //     ]);
  //     // ひらがなとカタカナの混合で検索
  //     await wrapper.find('input[type="search"]').setValue("ひらがなカタカナ");
  //     await wrapper.find("form").trigger("submit.prevent");
  //     expect(wrapper.vm.filteredIslands).toEqual([
  //       {
  //         id: 3,
  //         icon: "island3.png",
  //         islandName: "ひらがなカタカナアイランド",
  //         JoinProjects: [],
  //       },
  //     ]);
  //   });
});
