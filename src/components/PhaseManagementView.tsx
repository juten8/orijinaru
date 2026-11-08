import React, { useState } from 'react';
import { PRODUCE_PHASES, ProducePhase } from '../data/bridalData';
import { CheckCircle2, Circle, Clock, Sparkles, ChevronRight, Check } from 'lucide-react';

interface PhaseManagementViewProps {
  userRole: 'planner' | 'couple';
}

export const PhaseManagementView: React.FC<PhaseManagementViewProps> = ({ userRole }) => {
  const [activePhaseNumber, setActivePhaseNumber] = useState<number>(1);
  const [completedTaskIds, setCompletedTaskIds] = useState<Record<string, boolean>>({
    p1_t1: true,
  });

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const currentPhase: ProducePhase =
    PRODUCE_PHASES.find((p) => p.phaseNumber === activePhaseNumber) || PRODUCE_PHASES[0];

  // 全体進捗計算
  const totalTasks = PRODUCE_PHASES.reduce((acc, p) => acc + p.tasks.length, 0);
  const totalCompleted = Object.values(completedTaskIds).filter(Boolean).length;
  const progressPercent = Math.round((totalCompleted / totalTasks) * 100);

  return (
    <div className="space-y-10">
      {/* ヘッダーエリア */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="text-amber-700 font-serif-luxury tracking-widest text-xs font-semibold mb-1">
            WORKFLOW & TIMELINE MANAGEMENT
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900">
            「準備から当日実施まで」の工程可視化
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            全5フェーズに沿った段階的プロデュース。直前トラブルを防ぎ、一流のクオリティを保証する現場タスク管理
          </p>
        </div>

        {/* 進捗度メーター */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 sm:min-w-64">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-stone-600 font-medium">プロデュース進行達成度</span>
            <span className="font-mono font-bold text-stone-900 tabular-nums">
              {totalCompleted} / {totalTasks} 完了 ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* フェーズステップセレクター（横並びバー） */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        {PRODUCE_PHASES.map((phase) => {
          const isSelected = phase.phaseNumber === activePhaseNumber;
          const phaseTasksCompleted = phase.tasks.filter((t) => completedTaskIds[t.id]).length;
          const isAllDone = phaseTasksCompleted === phase.tasks.length;

          return (
            <button
              key={phase.id}
              type="button"
              onClick={() => setActivePhaseNumber(phase.phaseNumber)}
              className={`p-3.5 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                  : 'border-stone-200 bg-white hover:border-stone-300 text-stone-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span
                  className={`font-mono text-xs font-semibold ${
                    isSelected ? 'text-amber-400' : 'text-amber-700'
                  }`}
                >
                  Phase 0{phase.phaseNumber}
                </span>
                {isAllDone ? (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      isSelected ? 'text-emerald-400' : 'text-emerald-600'
                    }`}
                  />
                ) : (
                  <span
                    className={`text-xs ${
                      isSelected ? 'text-stone-400' : 'text-stone-400'
                    }`}
                  >
                    {phaseTasksCompleted}/{phase.tasks.length}
                  </span>
                )}
              </div>
              <div
                className={`text-xs sm:text-sm font-bold truncate ${
                  isSelected ? 'text-white' : 'text-stone-900'
                }`}
              >
                {phase.title}
              </div>
              <div
                className={`text-xs mt-1 truncate ${
                  isSelected ? 'text-stone-300' : 'text-stone-500'
                }`}
              >
                {phase.period}
              </div>
            </button>
          );
        })}
      </div>

      {/* 選択されたフェーズの詳細ビュー */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左: フェーズ概要 ＆ プロの極意（5カラム） */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-amber-700 text-xs font-semibold">
              <Clock className="w-4 h-4" />
              <span>所要目安: {currentPhase.period}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-900">
              Phase {currentPhase.phaseNumber}: {currentPhase.title}
            </h3>

            <div className="p-3.5 bg-stone-50 border border-stone-100 rounded-xl">
              <div className="text-xs font-bold text-stone-900 mb-1">この工程の核心目標</div>
              <p className="text-xs text-stone-700 leading-relaxed">
                {currentPhase.coreObjective}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {currentPhase.description}
            </p>
          </div>

          {/* プランナー研修用ノウハウ */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>プランナー研修生へ：ここが腕の見せ所！</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
              {currentPhase.plannerKeyTip}
            </p>
          </div>

          {/* 着付け＆美容アテンド要点 */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-3">
            <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-400" />
              <span>美容・着付けチームとの連携ポイント</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {currentPhase.kimonoAttendantTip}
            </p>
          </div>
        </div>

        {/* 右: インタラクティブタスクリスト（7カラム） */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h4 className="font-serif-luxury font-bold text-stone-900 text-base">
              実施タスク・チェックシート
            </h4>
            <span className="text-xs text-stone-500">
              クリックして完了マークを切り替え可能
            </span>
          </div>

          <div className="space-y-3">
            {currentPhase.tasks.map((task) => {
              const isChecked = !!completedTaskIds[task.id];
              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isChecked
                      ? 'border-stone-200 bg-stone-50/80 opacity-90'
                      : 'border-stone-200 bg-white hover:border-amber-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      type="button"
                      aria-label="タスク完了状態の切り替え"
                      className="mt-0.5 shrink-0 text-stone-400 hover:text-amber-600 focus:outline-hidden"
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-stone-300" />
                      )}
                    </button>

                    <div className="space-y-2 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span
                          className={`text-sm font-bold ${
                            isChecked ? 'line-through text-stone-500' : 'text-stone-900'
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed">
                        {task.description}
                      </p>

                      {/* ロール別チェック内容 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs">
                        <div className="p-2.5 rounded-lg bg-stone-100/70 text-stone-700">
                          <span className="font-semibold text-stone-900 block mb-0.5">
                            【プランナー視点】
                          </span>
                          <span>{task.plannerCheck}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-amber-50/70 text-amber-900">
                          <span className="font-semibold text-amber-950 block mb-0.5">
                            【新郎新婦のアクション】
                          </span>
                          <span>{task.coupleAction}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* フェーズ送りボタン */}
          <div className="flex justify-between items-center pt-4 border-t border-stone-200">
            <button
              type="button"
              disabled={activePhaseNumber <= 1}
              onClick={() => setActivePhaseNumber((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-md hover:bg-stone-50 disabled:opacity-40 transition-colors"
            >
              前へ: Phase 0{Math.max(1, activePhaseNumber - 1)}
            </button>

            <button
              type="button"
              disabled={activePhaseNumber >= 5}
              onClick={() => setActivePhaseNumber((prev) => Math.min(5, prev + 1))}
              className="px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-md hover:bg-stone-800 disabled:opacity-40 transition-colors flex items-center gap-1.5"
            >
              <span>次へ: Phase 0{Math.min(5, activePhaseNumber + 1)}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
