<template>

  <div class="bg-[#b03a2e] text-white text-center py-2 text-sm">
    12 students are reviewing teachers right now. Activity is increasing.
  </div>

  <div class="font-sans text-[#e8e8f0] overflow-x-hidden relative">

    <div class="pointer-events-none fixed inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>

    <section class="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

      <img
          src="../images/hero.jpg"
          class="absolute inset-0 w-full h-full object-cover"
      />

      <div class="absolute inset-0 bg-[#0f0f1a]/70"></div>

      <div class="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/70 to-transparent"></div>

      <div class="relative z-10 max-w-4xl px-6 md:px-12 text-center md:text-left">
        <h1 class="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6 drop-shadow-xl">
          See What Others Don't
        </h1>

        <p class="text-lg md:text-xl text-[#a0a0c0] mb-8 max-w-xl leading-relaxed">
          Scan a QR code with smart glasses and access insights others leave behind before you decide how to engage.
        </p>

        <router-link
            to="/reviews"
            class="bg-[#b03a2e] text-white px-8 py-4 rounded-2xl font-semibold shadow-lg
                 transition transform hover:bg-[#e05a40] hover:shadow-xl hover:-translate-y-1"
        >
          Get Started
        </router-link>

        <p class="text-sm text-[#6060a0] mt-6 opacity-90">
          What you see depends on who you are.
        </p>
      </div>
    </section>

    <section class="py-32 px-6 md:px-20 text-center bg-[#1a1a2e]">
      <h2 class="text-4xl font-bold mb-6 tracking-tight text-[#e8e8f0]">
        First impressions are incomplete
      </h2>
      <p class="max-w-2xl mx-auto text-[#a0a0c0] text-lg leading-relaxed">
        This system adds context to real-world interactions. Profiles and feedback shape how people are perceived.
      </p>
    </section>

    <section class="py-28 px-6 md:px-20 bg-[#1e1e30]">
      <h2 class="text-4xl font-bold text-center mb-16 tracking-tight text-[#e8e8f0]">
        How It Works
      </h2>

      <div class="grid md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">

        <div class="p-6 rounded-2xl bg-[#1a1a2e] border border-[#2e2e45] hover:shadow-xl hover:-translate-y-1 transition">
          <img src="../images/scan.png" class="mx-auto mb-4 w-12 opacity-80" />
          <h3 class="font-semibold text-lg mb-2 text-[#e8e8f0]">Scan</h3>
          <p class="text-[#a0a0c0] text-sm max-w-xs mx-auto leading-relaxed">
            Use smart glasses to scan a QR code linked to a profile.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-[#1a1a2e] border border-[#2e2e45] hover:shadow-xl hover:-translate-y-1 transition">
          <img src="../images/avatar.png" class="mx-auto mb-4 w-12 opacity-80" />
          <h3 class="font-semibold text-lg mb-2 text-[#e8e8f0]">View</h3>
          <p class="text-[#a0a0c0] text-sm max-w-xs mx-auto leading-relaxed">
            Instantly access information others have shared.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-[#1a1a2e] border border-[#2e2e45] hover:shadow-xl hover:-translate-y-1 transition">
          <img src="../images/review.png" class="mx-auto mb-4 w-12 opacity-80" />
          <h3 class="font-semibold text-lg mb-2 text-[#e8e8f0]">Contribute</h3>
          <p class="text-[#a0a0c0] text-sm max-w-xs mx-auto leading-relaxed">
            Add feedback that influences future interactions.
          </p>
        </div>

      </div>
    </section>

    <section class="py-28 px-6 md:px-20 bg-[#0f0f1a] text-white">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-6 tracking-tight">
          Perception Becomes Data
        </h2>
        <p class="text-[#a0a0c0] text-lg leading-relaxed">
          Every interaction contributes to a profile. Over time, patterns emerge. Some are visible. Some are not.
        </p>
      </div>
    </section>

    <div class="bg-[#252535] text-center py-3 text-sm text-[#e8e8f0] border-t border-[#3a3a55]">
      Some features may be limited until you explore your first profile.
    </div>

    <section class="py-28 px-6 md:px-20 bg-[#1a1a2e]">

      <div class="grid md:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">

        <div class="relative">
          <img src="../images/hero.jpg" class="rounded-2xl shadow-xl border border-[#2e2e45]" />
        </div>

        <div>
          <h2 class="text-3xl font-bold mb-4 tracking-tight text-[#e8e8f0]">
            Profiles Form Quickly(placeholder afbeelding)
          </h2>
          <p class="text-[#a0a0c0] text-lg max-w-md leading-relaxed">
            Insights accumulate from interactions. What appears on a profile shapes expectations before a conversation even begins.
          </p>
        </div>

      </div>

      <div class="grid md:grid-cols-2 gap-20 items-center max-w-6xl mx-auto mt-24">

        <div>
          <h2 class="text-3xl font-bold mb-4 tracking-tight text-[#e8e8f0]">
            Feedback Stays
          </h2>
          <p class="text-[#a0a0c0] text-lg max-w-md leading-relaxed">
            Experiences shared by others remain attached to profiles and influence how people are approached.
          </p>
        </div>

        <div class="relative">
          <img src="../images/2.png" class="rounded-2xl shadow-xl border border-[#2e2e45]" />

        </div>
      </div>
    </section>

    <section class="py-32 text-center bg-[#0f0f1a] text-white">
      <h2 class="text-4xl font-bold mb-6 tracking-tight">
        Start Exploring
      </h2>
      <p class="mb-10 text-lg opacity-90 leading-relaxed text-[#a0a0c0]">
        What you discover may change how you interact.
      </p>

      <router-link
          to="/reviews"
          class="bg-[#b03a2e] text-white px-8 py-4 rounded-2xl font-semibold shadow-lg
               transition transform hover:bg-[#e05a40] hover:shadow-xl hover:-translate-y-1"
      >
        Go to Reviews
      </router-link>
    </section>

  </div>
</template>
<script setup lang="ts">
</script>
